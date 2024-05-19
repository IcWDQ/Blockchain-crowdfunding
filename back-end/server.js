require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

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
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

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
  otherDocuments: { type: String }, // 存储图片的路径
  milestonestatus: { type: String },
  milestoneDDL: { type: Date }
});

milestoneSchema.index({ projectId: 1, milestoneId: 1 }, { unique: true });

const Milestone = mongoose.model('Milestone', milestoneSchema);

// Middleware to check project creator and project status
const isProjectCreatorAndFunded = async (req, res, next) => {
  try {
    console.log('Received request:', req.body); // 打印接收到的请求数据
    const projectId = parseInt(req.body.projectId, 10); // 确保 projectId 是整数
    console.log('Parsed projectId:', projectId); // 打印解析后的 projectId
    if (isNaN(projectId)) {
      console.error('Invalid project ID:', req.body.projectId);
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const project = await Project.findOne({ projectId });
    console.log('Fetched project:', project); // 打印查询到的项目
    if (!project) {
      console.error('Project not found:', projectId);
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.creator.toLowerCase() !== req.body.currentUser.toLowerCase()) {
      console.error('Only the project creator can approve milestones:', req.body.currentUser);
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
app.use('/uploads', express.static('uploads')); // 使 uploads 文件夹中的文件可访问

// Routes for projects
app.post('/api/projects', async (req, res) => {
  console.log('Received project creation request:', req.body); // 打印接收到的请求数据
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
      milestoneDDL: new Date()
    }));
    await Milestone.insertMany(milestones, { session });

    await session.commitTransaction();
    res.json(project);
  } catch (err) {
    await session.abortTransaction();
    console.error('Error saving project:', err.message, err); // 打印详细错误信息
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
    .populate('milestones') // Populate milestones
    .then(project => {
      console.log('Fetched project:', project); // 打印查询到的项目
      res.json(project);
    })
    .catch(err => {
      console.error('Error fetching project:', err);
      res.status(400).json({ error: err.message });
    });
});

// Routes for user approve milestones
app.post('/api/userApproveMilestones', isProjectCreatorAndFunded, (req, res) => {
  console.log('Request received for userApproveMilestones:', req.body);
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(400).json({ error: err });
    } 

    if (req.file == undefined) {
      console.error('No file selected');
      return res.status(400).json({ error: 'No file selected' });
    } 

    console.log('File uploaded successfully:', req.file);
    try {
      const milestone = await Milestone.findOne({ projectId: req.body.projectId, milestoneId: req.body.milestoneId });
      if (!milestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }

      milestone.milestoneDescription = req.body.milestoneDescription;
      milestone.otherDocuments = `/uploads/${req.file.filename}`;
      milestone.milestonestatus = 'Pending'; // 确保初始状态设置正确
      milestone.milestoneDDL = new Date(); // 设置适当的截止日期

      await milestone.save();
      console.log('Milestone updated successfully:', milestone);
      res.json(milestone);
    } catch (err) {
      console.error('Error updating milestone:', err.message, err);
      res.status(500).json({ error: err.message });
    }
  });
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

// 获取所有状态为Pending的里程碑
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

// 管理员审批里程碑
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

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));