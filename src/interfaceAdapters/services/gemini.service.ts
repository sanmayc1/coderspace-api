import { injectable } from 'tsyringe';
import { IGeminiService } from '../../domain/services/gemini-service.interface';
import { ITestcaseEntity } from '../../domain/entities/testcase-entity';
import { GoogleGenAI } from '@google/genai';
import { config } from '../controllers/auth';

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

    return testcases
  }
}
