const mongoose = require('mongoose');

// DB Config
const db = 'mongodb+srv://nihao1234:nihao1234@cluster0.zfprd6p.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    clearCollections();
  })
  .catch(err => console.log(err));

const clearCollections = async () => {
  try {
    await mongoose.connection.db.dropCollection('projects');
    console.log('Cleared projects collection');

    await mongoose.connection.db.dropCollection('milestones');
    console.log('Cleared milestones collection');

    await mongoose.connection.db.dropCollection('activities');
    console.log('Cleared activities collection');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error clearing collections:', err);
    mongoose.connection.close();
  }
};
