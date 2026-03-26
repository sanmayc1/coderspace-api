
export interface IInterviewQuestionsEntity {
  _id: string;
  sessionId: string;
  question: string;
  order:number;
  answer: string;
  attempted: boolean;
  feedback: string;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;  
}
