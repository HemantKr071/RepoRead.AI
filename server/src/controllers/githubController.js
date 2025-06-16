import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import { Repo } from '../model/Repo.js';
import { generateReadmeFromRepo } from '../utils/readmeGenerator.js';
import { syncUserRepos } from '../utils/syncReposWithGithub.js';
import { decrypt } from '../utils/cryptoUtils.js';
dotenv.config();

// Fetch all repos for user with pagination
export const getAllRepos = async (req, res) => {
  const username = (req.user.username || "").trim();
  const page = parseInt(req.query.page) || 1;        
  const limit = parseInt(req.query.limit) || 9;   

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Sync with GitHub before fetching
     await syncUserRepos(user);


    const skip = (page - 1) * limit;

    // Fetch repos with pagination
    const repos = await Repo.find({ userId: user._id })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });  // Optional: sort by created_at descending

    
    const totalRepos = await Repo.countDocuments({ userId: user._id });
    const totalPages = Math.ceil(totalRepos / limit);
    
    //console.log("Repo Fetched Successfully", repos);

    return res.status(200).json({
      msg: "Repos fetched successfully",
      page,
      totalPages,
      totalRepos,
      repos,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error while fetching repos" });
  }
};


//Generate readme for a repo
export const generateReadme = async (req, res) => {
  const id = (req.params.id || "").trim();  // Repo ID

  if (!id || !req.user.userId) {
    return res.status(400).json({ error: 'Missing repository ID or user authentication.' });
  }

  try {
    // Find the repo belonging to the logged-in user
    const repo = await Repo.findOne({ _id: id, userId: req.user.userId });

    if (!repo) {
      return res.status(404).json({ error: 'Repository not found or access denied.' });
    }

    // Get the user details
    const user = await User.findById(req.user.userId);

    if (!user || !user.accessToken) {
      return res.status(400).json({ error: 'User not found or access token missing.' });
    }

    const repoUrl = repo.html_url;
    const accessToken = decrypt(user.accessToken);
    const readme = await generateReadmeFromRepo(repoUrl,accessToken);

    return res.status(200).json({
      msg: 'README created successfully',
      readme,
    });

  } catch (error) {
    console.error('README generation error:', error);
    return res.status(500).json({
      error: 'An internal error occurred while generating the README.',
    });
  }
};

