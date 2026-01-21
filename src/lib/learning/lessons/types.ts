export type Lesson = {
  id: string;
  title: string;
  originalPrompt: string;
  explanation: string;
  keyPoints: string[];
  createdAt: Date;
};

export type LessonRequest = {
  prompt: string;
};

export type GeneratedLesson = {
  explanation: string;
  keyPoints: string[];
};
