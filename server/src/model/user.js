import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  avatarUrl: String,
  accessToken: String,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
