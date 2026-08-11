import type { Agent } from '../models/BaseAgent.js';
import type { Resume } from '../models/Resume.js';
import type { Review } from '../models/Review.js';
import { ResumeOutputCheckerPrompts } from '../prompts/ResumeOutputCheckerPrompts.js';
import { GeminiClient } from '../ai/GeminiClient.js';

interface ResumeCheckInput {
  AiUpdatedResume: Resume;
  OriginalJobDescription: string;
}

export class ResumeOutputCheckerAgent implements Agent<
  ResumeCheckInput,
  Review
> {
  name: string = 'ResumeOutputChecker';
  constructor(private ai: GeminiClient) {}

  async run(input: ResumeCheckInput): Promise<Review> {
    const prompt = ResumeOutputCheckerPrompts(
      input.AiUpdatedResume,
      input.OriginalJobDescription
    );
    const response = await this.ai.generateText(prompt);

    // Clean the response to extract JSON and parse it
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  }
}
