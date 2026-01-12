import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
