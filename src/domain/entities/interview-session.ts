
export interface IInterviewSessionEntity {
  _id: string;
  accountId: string;
  interviewId: string;
  status: "ongoing" | "completed" | "partially_completed";
  startedAt: Date;
  completedAt?: Date;
  finalScore?: number;
  overallFeedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
}