import OpenAI from "openai";
import { ENV } from "@/lib/config/env";

export const openaiClient = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});
