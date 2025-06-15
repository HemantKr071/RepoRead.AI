import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { prompt } from "./prompts.js";
import dotenv from "dotenv";

dotenv.config();
const start = Date.now();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "models/gemini-1.5-flash",
});

export async function generateReadmeFromRepo(repoUrl,accessToken){
  const loader = new GithubRepoLoader(repoUrl, {
      accessToken:accessToken,
      recursive: true,
      branch: "main",
  });

  const documents = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 1000,
  });

  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  const chunks = await splitter.splitDocuments(documents);

// ✅ Rate-limited: Gemini allows 15 requests/min, so batch size = 15, delay = 60,000ms
  async function summarizeChunksInBatches(chunks, batchSize = 12, delayMs = 45000) {
    const summaries = [];
    console.log("Total chunks :" , chunks.length, "Batch Size : " , Math.floor(chunks.length/15));
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);

      console.log(`Summarizing batch ${Math.floor(i / batchSize) + 1}...`);

      const batchResults = await Promise.all(
        batch.map(async (chunk, index) => {
          try {
            const response = await model.call([
              {
                role: "user",
                content: `Summarize this code:\n\n${chunk.pageContent}`,
              },
            ]);
            return response.content;
          } catch (error) {
            console.error(`Error summarizing chunk ${i + index + 1}:`, error.message);
            return "[Error summarizing this chunk]";
          }
        })
      );

      summaries.push(...batchResults);
    if (i + batchSize < chunks.length) {
      console.log(`Waiting ${delayMs}ms before next batch...`);
      await sleep(delayMs);
    }
    }

    return summaries;
  }

  const summaries = await summarizeChunksInBatches(chunks);

  const combined = summaries.join("\n");

  const finalPrompt = [
    {
      role: "user",
      content: `${prompt + combined}

      `,
    },
  ];

  console.log("Generating README from summaries...");
  const readme = await model.call(finalPrompt);
  console.log("\n📄 README:\n");
  console.log(readme.content);

  const end = Date.now();

  console.log(`Execution time: ${end - start} ms`);

  return readme.content;

}
