import { KnowledgeRequest } from "./types";

export async function generateExplanation(
  input: KnowledgeRequest
): Promise<string>{
   return `Explanation for level ${input.level}: ${input.prompt}`;

}