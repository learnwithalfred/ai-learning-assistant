export type FollowUpMessage = {
  id: string;
  lessonId: string;
  userId: string;
  text: string;
  createdAt: Date;
};

export type FollowUpAskRequest = {
  lessonId: string;
  question: string;
};
