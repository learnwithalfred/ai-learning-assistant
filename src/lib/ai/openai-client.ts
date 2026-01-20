import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing on the server.");
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
