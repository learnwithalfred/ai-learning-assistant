export type FollowUpMessage = {
  id: string;
  lessonId: string;
  role: "user" | "assistant";
  text: string;
  createdAt: Date;
};

export type FollowUpAskRequest = {
  lessonId: string;
  question: string;
};
