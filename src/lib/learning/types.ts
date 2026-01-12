export type KnowledgeUnit = {
  id: string;
  topic: string;
  originalPrompt: string;
  explanation: string;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;

}

export type KnowledgeRequest = {
  prompt: string
  level: "beginner" | "intermediate" | "advanced"; 
}