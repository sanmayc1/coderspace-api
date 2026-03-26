import { injectable } from 'tsyringe';
import { IGeminiService } from '../../domain/services/gemini-service.interface';
import { ITestcaseEntity } from '../../domain/entities/testcase-entity';
import { GoogleGenAI } from '@google/genai';
import { config } from '../controllers/auth';
import { IInterviewEntity } from '../../domain/entities/interview-entity';

@injectable()
export class GeminiService implements IGeminiService {
  constructor(private _ai = new GoogleGenAI({ apiKey: config.geminiApiKey })) {}

  async generateTestcase(problem: string, exampleTestCase: string): Promise<ITestcaseEntity[]> {
    const prompt = `
You are a backend system.

Generate EXACTLY 20 test cases.
Do NOT return less or more than 2.
Do NOT use markdown.
Do NOT use backticks.
Do NOT add explanation or text.

Problem:
${problem}

Example (only for understanding format):
${exampleTestCase}

Rules:
- Include normal cases
- Include edge cases
- Include invalid inputs
- Use realistic values only

Return STRICT JSON ONLY in the following format:
[
  { "input": "...", "output": "..." }
]
`;

    const response = await this._ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text as string;
    const testcases = JSON.parse(text);

    return testcases;
  }

  async generateInterviewQuestions(
    interviewDetails: IInterviewEntity,
    userName: string
  ): Promise<{ questionNumber: number; question: string }[]> {
    const prompt = `
You are an experienced technical interviewer conducting a real interview.

Candidate Name: ${userName}
Interview Context: ${interviewDetails.context}
Title: ${interviewDetails.title}
Description: ${interviewDetails.description}
Difficulty Level: ${interviewDetails.difficulty}
Number of Questions: ${interviewDetails.numberOfQuestions}
Interview Duration: ${interviewDetails.durationInMinutes}

Instructions:
- Generate exactly ${interviewDetails.numberOfQuestions} interview questions.
- Questions must match the given difficulty level and interview context.
- The tone must feel like a real interviewer speaking naturally.
- The first question MUST start with a greeting addressing the candidate by name.
- Every next question should smoothly transition like a real interview.
- Ask ONLY verbal/theoretical questions.
- DO NOT ask the candidate to write code, implement functions, or solve problems step-by-step.
- DO NOT include tasks like "write a function", "implement", "code", or "solve this problem".
- Questions should be answerable by speaking/explaining concepts only.

Output Rules:
- Return ONLY raw JSON.
- DO NOT wrap in markdown (no \`\`\`).
- DO NOT include explanations or text outside JSON.
- The response MUST start with [ and end with ].
- Ensure valid JSON array format.

Output Format:
[
  {
    "questionNumber": 1,
    "question": "..."
  }
]

If you include markdown or anything other than raw JSON, the response is invalid.

Now generate the questions.
`;

    const response = await this._ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text as string;

    const questions = JSON.parse(text);
    return questions;
  }
}
