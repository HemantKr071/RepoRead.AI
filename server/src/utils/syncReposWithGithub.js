import { Repo } from "../model/Repo.js";
import axios from "axios";
import { decrypt } from "./cryptoUtils.js";
// Sync GitHub repos to DB
export const syncUserRepos = async (user) => {
  const accessToken = decrypt(user.accessToken);
  const response = await axios.get('https://api.github.com/user/repos', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const repos = response.data;

  for (const repo of repos) {
    await Repo.updateOne(
      { githubId: repo.id },
      {
        githubId: repo.id,
        userId: user._id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        html_url: repo.html_url,
        updated_at: new Date(repo.updated_at),
        created_at: new Date(repo.created_at),
      },
      { upsert: true }
    );
  }
};