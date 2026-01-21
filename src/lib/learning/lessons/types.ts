export type Lesson = {
  id: string;
  topic: string;
  originalPrompt: string;
  explanation: string;
  keyPoints: string[];
  createdAt: Date;
};


// export type LessonSammary = {
//   id: string;
//   topic: string;
//   keyPoints: string[];
//   createdAt: Date;
// };

export type LessonRequest = {
  prompt: string;
};

export type GeneratedLesson = {
  explanation: string;
  keyPoints: string[];
};
