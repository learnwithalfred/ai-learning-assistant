import { openaiClient } from "./openai-client";
import { AI_CONFIG } from "./configs";
import { ExternalServiceError } from "@/lib/errors";

export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await openaiClient.responses.create({
      model: AI_CONFIG.model,
      input: prompt,
      reasoning: AI_CONFIG.reasoning,
      max_output_tokens: AI_CONFIG.maxOutputTokens,
    });

    const text = response.output_text?.trim();

    if (!text) {
      throw new ExternalServiceError("Model returned empty response");
    }

    return text;
  } catch (error) {
    throw new ExternalServiceError("AI request failed");
  }
}
