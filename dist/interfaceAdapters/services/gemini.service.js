"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const tsyringe_1 = require("tsyringe");
const genai_1 = require("@google/genai");
const auth_1 = require("../controllers/auth");
let GeminiService = class GeminiService {
    _ai;
    constructor(_ai = new genai_1.GoogleGenAI({ apiKey: auth_1.config.geminiApiKey })) {
        this._ai = _ai;
    }
    async generateInterviewAnswerFeedback(questions, totalQuestions, attemptedQuestions) {
        const prompt = `
You are an expert interviewer.

Interview Data:
- Total Questions: ${totalQuestions}
- Attempted Questions: ${attemptedQuestions}

Questions and Candidate Answers:
${questions.map((item, index) => `
${index + 1}. Question: ${item.question}
   Answer: ${item.answer || "No answer provided"}
`).join("\n")}

Important Context:
- The candidate’s answers were converted from speech to text using the browser Web Speech API.
- The transcription may contain minor grammatical errors, missing words, or slight inaccuracies.
- Focus on the intent and meaning rather than small language mistakes.

Evaluation Rules:
- Evaluate overall performance across all questions
- Consider correctness, clarity, and completeness
- Consider normal cases, edge cases, and invalid inputs (if relevant)
- Use realistic expectations based on attempted questions

Instructions:
- Provide constructive and concise overall feedback
- Highlight strengths and key areas of improvement
- Do not penalize heavily for minor transcription or grammar issues
- Focus on technical understanding and explanation quality

Special Conditions:
- If all answers are empty → feedback: "The candidate did not answer any questions." and rating: 0
- If some answers are empty → consider only attempted ones but mention lack of attempts in feedback

Output Rules:
- Return ONLY raw JSON
- DO NOT wrap in markdown
- DO NOT include any text outside JSON
- Ensure valid JSON format

Return STRICT JSON ONLY in the following format:
{
  "feedback": "...",
  "rating": 0-5
}
`;
        const response = await this._ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const text = response.text;
        const feedback = JSON.parse(text);
        return feedback;
    }
    async generateTestcase(problem, exampleTestCase) {
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
        const text = response.text;
        const testcases = JSON.parse(text);
        return testcases;
    }
    async generateInterviewQuestions(interviewDetails, userName) {
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
        const text = response.text;
        const questions = JSON.parse(text);
        return questions;
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map