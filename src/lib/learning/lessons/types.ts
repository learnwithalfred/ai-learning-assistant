export type Lesson = {
  id: string;
  title: string;
  originalPrompt: string;
  explanation: string;
  keyPoints: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LessonRequest = {
  prompt: string;
};

export type GeneratedLesson = {
  explanation: string;
  keyPoints: string[];
};
