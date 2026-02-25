import OpenAI from "openai";
import { ValidationError } from "../errors";

if (!process.env.OPENAI_API_KEY) {
  throw new ValidationError("OPENAI_API_KEY is missing on the server.");
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
