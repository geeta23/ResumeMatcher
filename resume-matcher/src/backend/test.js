import dotenv from "dotenv";
dotenv.config();

console.log("🚀 Test script started");
console.log("API KEY LOADED? ", process.env.OPENAI_API_KEY ? "YES" : "NO");

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  try {
    console.log("🔍 Fetching models...");
    const models = await client.models.list();

    console.log("✔️ Available models:");
    models.data.forEach(m => console.log("-", m.id));
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();
