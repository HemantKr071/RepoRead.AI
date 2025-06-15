import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import { decrypt, encrypt } from '../utils/cryptoUtils.js';

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

export const redirectURL = async (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`;
  res.redirect(authUrl);
};

export const authCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  console.log("Received OAuth code:");

  let accessToken;
  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    accessToken = tokenRes.data.access_token;
    if (!accessToken) throw new Error("No access token received");
    console.log("Access Token Granted!!");
  } catch (err) {
    console.error("Error exchanging code for access token:", err.message);
    return res.status(500).json({ error: "Failed to get access token", details: err.message });
  }

  let user;
  try {
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    user = userRes.data;
    console.log("User data fetched:", user.login);
  } catch (err) {
    console.error("Error fetching user data from GitHub:", err.message);
    return res.status(500).json({ error: "Failed to fetch GitHub user", details: err.message });
  }

  // Fallback to fetch email if not provided
  let email = user.email;
  if (!email) {
    try {
      const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailsRes.data.find((e) => e.primary && e.verified);
      email = primaryEmail?.email || "no-email@github.com";
    } catch (err) {
      console.error("Error fetching user email:", err.message);
      email = "no-email@github.com";
    }
  }

  let userData;
  try {
    const encrypted_access_token = encrypt(accessToken);
    console.log("Encryted Token" , encrypted_access_token);
    userData = await User.findOneAndUpdate(
      { username: user.login },
      {
        username: user.login,
        name: user.name || user.login,
        email,
        avatarUrl: user.avatar_url,
        accessToken:encrypted_access_token
      },
      { new: true, upsert: true }
    );
    console.log("User saved/updated in DB:", user.login);
  } catch (err) {
    console.error("Error saving user to DB:", err.message);
    return res.status(500).json({ error: "Failed to save user", details: err.message });
  }

  try {
    const { accessToken: _, ...safeUserData } = userData.toObject();

    const token = jwt.sign(
      {
        email: safeUserData.email,
        username: safeUserData.username,
        id : safeUserData._id
      },
      process.env.JWT_SECRET
    );

    console.log("JWT token generated for user:", safeUserData.username, safeUserData._id);

    return res.status(201).json({
      user: safeUserData,
      token,
    });
  } catch (err) {
    console.error("Error generating JWT token:", err.message);
    return res.status(500).json({ error: "Failed to generate token", details: err.message });
  }
};


export const Logout = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findOne({_id:userId});
  const accessToken = decrypt(user.accessToken);

  try {
    // Revoke token via GitHub API
    const response = await axios.delete(
      `https://api.github.com/applications/${CLIENT_ID}/token`,
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        data: {
          access_token: accessToken,
        },
        headers: {
          'Accept': 'application/vnd.github+json',
        },
      }
    );
    console.log("Token revoked Successfully..")
    return res.status(200).json({ message: 'Access token revoked successfully.' });
  } catch (error) {
    console.error('Token revocation error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to revoke access token.' });
  }
};