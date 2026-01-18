export type KnowledgeUnit = {
  id: string;
  topic: string;
  originalPrompt: string;

  simplifiedExplanation: string;
  childExplanation: string;
  keyPoints: string[];

  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
};

export type KnowledgeRequest = {
  prompt: string;
  level: "beginner" | "intermediate" | "advanced";
};

export type GeneratedLesson = {
  topic: string;
  simplifiedExplanation: string;
  childExplanation: string;
  keyPoints: string[];
};
