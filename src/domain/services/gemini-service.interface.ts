import { IInterviewEntity } from '../entities/interview-entity';
import { IInterviewQuestionsEntity } from '../entities/interview-questions';
import { ITestcaseEntity } from '../entities/testcase-entity';

export interface IGeminiService {
  generateTestcase(problem: string, exampleTestCase: string): Promise<ITestcaseEntity[]>;
  generateInterviewQuestions(
    interviewDetails: IInterviewEntity,
    userName: string
  ): Promise<{ questionNumber: number; question: string;}[]>;
  generateInterviewAnswerFeedback(
    questions:IInterviewQuestionsEntity[],
    totalQuestions:number,
    attemptedQuestions:number
    
  ):Promise<{feedback:string,rating:number}>;
}
