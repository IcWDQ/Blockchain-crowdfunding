const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const cron = require('node-cron');
const { ethers } = require('ethers');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 文件大小最大100MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('otherDocument');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// DB Config
const db = 'mongodb+srv://nihao1234:nihao1234@cluster0.zfprd6p.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Project model
const projectSchema = new mongoose.Schema({
  projectId: { type: Number, required: true, unique: true },
  projectName: { type: String, required: true },
  projectType: { 
    type: String, 
    required: true, 
    enum: ['Education', 'Finance', 'AI', 'Medical', 'Others'] 
  },
  projectDescription: { type: String, required: true },
  creator: { type: String, required: true },
  fundingGoal: { type: Number, required: true },
  amountRaised: { type: Number, required: true },
  status: { type: String, required: true },
  contributors: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  projectDDL: { type: Date, required: true }
});

// 设置虚拟字段来引用 Milestone
projectSchema.virtual('milestones', {
  ref: 'Milestone',
  localField: 'projectId',
  foreignField: 'projectId',
  justOne: false
});

const Project = mongoose.model('Project', projectSchema);

// Define the Milestone model
const milestoneSchema = new mongoose.Schema({
  projectId: { type: Number, required: true },
  projectName: { type: String, required: true },
  milestoneId: { type: Number, required: true },
  milestoneDescription: { type: String },
  otherDocuments: { type: String },
  milestonestatus: { type: String },
  milestoneDDL: { type: Date },
  goal: { type: Number, required: true}
});

milestoneSchema.index({ projectId: 1, milestoneId: 1 }, { unique: true });

const Milestone = mongoose.model('Milestone', milestoneSchema);

// Middleware to check project creator and project status
const isProjectCreatorAndFunded = async (req, res, next) => {
  try {
    console.log('Received request:', req.body);
    const { projectId, milestoneId, currentUser } = req.body;
    console.log('Parsed projectId:', projectId);
    console.log('Parsed milestoneId:', milestoneId);

    if (isNaN(parseInt(projectId, 10)) || isNaN(parseInt(milestoneId, 10))) {
      console.error('Invalid project ID or milestone ID:', req.body);
      return res.status(400).json({ error: 'Invalid project ID or milestone ID' });
    }

    const project = await Project.findOne({ projectId });
    console.log('Fetched project:', project);
    if (!project) {
      console.error('Project not found:', projectId);
      return res.status(404).json({ error: 'Project not found' });
    }

    const milestone = await Milestone.findOne({ projectId, milestoneId });
    console.log('Fetched milestone:', milestone);
    if (!milestone) {
      console.error('Milestone not found:', { projectId, milestoneId });
      return res.status(404).json({ error: 'Milestone not found' });
    }

    if (project.creator.toLowerCase() !== currentUser.toLowerCase()) {
      console.error('Only the project creator can approve milestones:', currentUser);
      return res.status(403).json({ error: 'Only the project creator can approve milestones' });
    }
    if (project.status !== 'Funded') {
      console.error('Project is not in funded status:', projectId);
      return res.status(400).json({ error: 'Project is not in funded status' });
    }
    next();
  } catch (error) {
    console.error('Error in middleware:', error);
    res.status(500).json({ error: error.message });
  }
};

// Define the Activity model
const Activity = mongoose.model('activities', new mongoose.Schema({
  type: { type: String, required: true },
  projectId: { type: Number, required: true },
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object, required: true }
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Routes for projects
app.post('/api/projects', async (req, res) => {
  console.log('Received project creation request:', req.body);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save({ session });

    // 创建里程碑
    const milestones = req.body.milestones.map(ms => ({
      ...ms,
      milestoneDescription: '',
      milestonestatus: 'Pending',
      milestoneDDL: new Date(ms.milestoneDDL), // 确保 milestoneDDL 是 Date 对象
      goal: ms.goal
    }));

    await Milestone.insertMany(milestones, { session });

    await session.commitTransaction();
    res.json(project);
  } catch (err) {
    await session.abortTransaction();
    console.error('Error saving project:', err);
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
});

app.get('/api/projects', (req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => {
      console.error('Error fetching projects:', err);
      res.status(400).json({ error: err.message });
    });
});

app.get('/api/projects/:id', (req, res) => {
  Project.findOne({ projectId: req.params.id })
    .populate('milestones')
    .then(project => {
      console.log('Fetched project:', project);
      res.json(project);
    })
    .catch(err => {
      console.error('Error fetching project:', err);
      res.status(400).json({ error: err.message });
    });
});


app.post('/api/projects/approve', async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.status !== 'Pending') {
      return res.status(400).json({ error: 'Project is not in pending status' });
    }

    project.status = 'Active'; // 更新项目状态为 "Active"
    await project.save();

    res.json({ success: true, message: 'Project status updated to Active' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects/fund', async (req, res) => {
  const { projectId, amount } = req.body;

  try {
    console.log(`Received funding request for project ${projectId} with amount ${amount}`);

    const project = await Project.findOne({ projectId });
    if (!project) {
      console.log('Project not found');
      return res.status(404).json({ error: 'Project not found' });
    }

    console.log(`Found project: ${project}`);

    const amountInEth = parseFloat(amount);
    const amountInWei = amountInEth * 10 ** 18;

    console.log(`Amount in Wei: ${amountInWei}`);
    console.log(`Amount in Eth: ${amountInEth}`);

    project.amountRaised += amountInEth; // 更新已筹集资金，以 eth 为单位

    console.log(`Updated amountRaised: ${project.amountRaised}`);

    // 检查是否已达到筹资目标，fundingGoal 是 wei 为单位
    const fundingGoalInEth = project.fundingGoal / 10 ** 18;
    if (project.amountRaised >= fundingGoalInEth) {
      project.status = 'Funded';
    }

    await project.save();
    console.log('Project updated successfully');

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects/refund', async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.status = 'Refunded'; // 设置项目状态为 Refunded 或者其他合适的状态
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects/withdrawFunds', async (req, res) => {
  const { projectId, milestoneId } = req.body;

  try {
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const milestone = await Milestone.findOne({ projectId, milestoneId });
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    milestone.milestonestatus = 'Completed';
    await milestone.save();

    project.amountRaised -= milestone.goal / 10 ** 18; // 减去里程碑的资金量

    // Check if all milestones are completed
    const allMilestonesCompleted = await Milestone.find({ projectId, milestonestatus: { $ne: 'Completed' } }).countDocuments() === 0;

    if (allMilestonesCompleted) {
      project.status = 'Completed';
    }

    await project.save();

    res.json({ updated: allMilestonesCompleted });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects/cancel', async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // 检查项目是否处于可以取消的状态
    if (project.status !== 'Active' && project.status !== 'Funded') {
      return res.status(400).json({ error: 'Project cannot be cancelled in its current state' });
    }

    // 更新项目状态为 'Cancelled'
    project.status = 'Cancelled';
    await project.save();

    // 更新所有相关的里程碑状态为 'Completed'
    await Milestone.updateMany(
      { projectId: projectId },
      { $set: { milestonestatus: 'Completed' } }
    );

    // 退还每个捐款者的资金
    const remainingFunds = project.amountRaised;
    for (const [contributor, contribution] of project.contributions) {
      if (contribution > 0) {
        // 退还每个捐款者的资金
        await provider.sendTransaction({
          to: contributor,
          value: ethers.utils.parseEther(contribution.toString())
        });
      }
    }

    res.json({ success: true, message: 'Project cancelled and funds refunded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Routes for user approve milestones
app.post('/api/userApproveMilestones', upload, isProjectCreatorAndFunded, async (req, res) => {
  console.log('Request received for userApproveMilestones:', req.body);
  if (req.file == undefined) {
    console.error('No file selected');
    res.status(400).json({ error: 'No file selected' });
  } else {
    console.log('File uploaded successfully:', req.file);
    try {
      const projectId = parseInt(req.body.projectId, 10);
      const milestoneId = parseInt(req.body.milestoneId, 10);
      
      if (isNaN(projectId) || isNaN(milestoneId)) {
        console.error('Invalid project ID or milestone ID:', req.body);
        return res.status(400).json({ error: 'Invalid project ID or milestone ID' });
      }

      const milestone = await Milestone.findOne({ projectId, milestoneId });
      if (!milestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }

      milestone.milestoneDescription = req.body.milestoneDescription;
      milestone.otherDocuments = `/uploads/${req.file.filename}`;
      
      await milestone.save();
      console.log('Milestone updated successfully:', milestone);
      res.json(milestone);
    } catch (err) {
      console.error('Error updating milestone:', err);
      res.status(400).json({ error: err.message });
    }
  }
});

// Routes for activities
app.post('/api/activities', (req, res) => {
  const newActivity = new Activity(req.body);
  newActivity.save()
    .then(activity => res.json(activity))
    .catch(err => {
      console.error('Error saving activity:', err);
      res.status(400).json({ error: err.message });
    });
});

app.get('/api/activities', (req, res) => {
  Activity.find()
    .then(activities => res.json(activities))
    .catch(err => {
      console.error('Error fetching activities:', err);
      res.status(400).json({ error: err.message });
    });
});

app.get('/api/milestones/pending', (req, res) => {
  Milestone.find({ milestonestatus: 'Pending' })
    .then(milestones => res.json(milestones))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/milestones', (req, res) => {
  Milestone.find()
    .then(milestones => res.json(milestones))
    .catch(err => res.status(400).json({ error: err.message }));
});
app.get('/api/projects/:projectId/milestones/:milestoneId', async (req, res) => {
  const { projectId, milestoneId } = req.params;

  try {
    const milestone = await Milestone.findOne({ projectId: parseInt(projectId, 10), milestoneId: parseInt(milestoneId, 10) });
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    res.json({ milestoneStatus: milestone.milestonestatus });
  } catch (error) {
    console.error('Error fetching milestone status:', error);
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/milestones/approve', async (req, res) => {
  const { projectId, milestoneId } = req.body;

  try {
    const milestone = await Milestone.findOne({ projectId, milestoneId });
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    milestone.milestonestatus = 'Approved';
    await milestone.save();

    res.json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 定义定时任务，每分钟检查一次
cron.schedule('* * * * *', async () => {
  console.log('Running a task every minute to check for project DDLs');
  try {
    const now = new Date();
    const projectsToCancel = await Project.find({
      projectDDL: { $lt: now },
      status: { $ne: 'Funded' }
    });

    for (const project of projectsToCancel) {
      project.status = 'Cancelled';

      // 更新所有相关的里程碑状态为 'Completed'
      await Milestone.updateMany(
        { projectId: project.projectId },
        { $set: { milestonestatus: 'Completed' } }
      );

      // 退还每个捐款者的资金
      const remainingFunds = project.amountRaised;
      for (const contributor of project.contributors) {
        const contribution = project.contributions.get(contributor); // 使用 Map 的 get 方法
        if (contribution > 0) {
          // 使用以太坊网络退还每个捐款者的资金
          await provider.sendTransaction({
            to: contributor,
            value: ethers.utils.parseEther(contribution.toString())
          });
        }
      }

      await project.save();
      console.log(`Project ${project.projectId} has been cancelled and funds refunded`);
    }
    

    // 查找所有状态为 'Cancelled' 的项目
    const cancelledProjects = await Project.find({
      status: 'Cancelled'
    });

    for (const project of cancelledProjects) {
      // 更新所有相关的里程碑状态为 'Completed'
      await Milestone.updateMany(
        { projectId: project.projectId },
        { $set: { milestonestatus: 'Completed' } }
      );
    }

  } catch (error) {
    console.error('Error in scheduled task', error);
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
