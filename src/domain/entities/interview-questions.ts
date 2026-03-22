
export interface IInterviewQuestionsEntity {
  _id: string;
  sessionId: string;
  question: string;
  answer: string;
  attempted: boolean;
  feedback: string;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;  
}
