import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
