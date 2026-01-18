export type FollowUpMessage = {
  id: string;
  unitId: string;
  role: "user" | "assistant";
  text: string;
  createdAt: Date;
};

export type FollowUpAskRequest = {
  unitId: string;
  question: string;
};
