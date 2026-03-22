
export interface IInterviewSessionEntity {
  _id: string;
  userId: string;
  interviewId: string;
  status: "ongoing" | "completed" | "partially_completed";
  startedAt: Date;
  completedAt?: Date;
  finalScore?: number;
  overallFeedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
}