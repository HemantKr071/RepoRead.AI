import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
  githubId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  full_name: String,
  private: Boolean,
  description: String,
  language: String,
  stargazers_count: Number,
  forks_count: Number,
  html_url: String,
  updated_at: Date,
  created_at: Date,
}, { timestamps: true });

export const Repo = mongoose.model('Repo', repoSchema);
