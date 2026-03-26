import { IInterviewEntity } from '../entities/interview-entity';
import { ITestcaseEntity } from '../entities/testcase-entity';

export interface IGeminiService {
  generateTestcase(problem: string, exampleTestCase: string): Promise<ITestcaseEntity[]>;
  generateInterviewQuestions(
    interviewDetails: IInterviewEntity,
    userName: string
  ): Promise<{ questionNumber: number; question: string;}[]>;
}
