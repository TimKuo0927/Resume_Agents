import type { Agent } from '../models/BaseAgent.js';
import type { Resume, AiOptimizedResume } from '../models/Resume.js';
import type { JobAnalysis } from '../models/JobAnalysis.js';
import { resumeOptimizePrompt } from '../prompts/ResumeOptimizePrompt.js';
import { GeminiClient } from '../ai/GeminiClient.js';

export interface ResumeOptimizerInput {
  resume: Resume;
  job: JobAnalysis;
}

export class ResumeOptimizerAgent implements Agent<
  ResumeOptimizerInput,
  AiOptimizedResume
> {
  name: string = 'ResumeOptimizer';
  constructor(private ai: GeminiClient) {}

  async run(input: ResumeOptimizerInput): Promise<AiOptimizedResume> {
    const prompt = resumeOptimizePrompt(input.resume, input.job);
    const response = await this.ai.generateText(prompt);
    // Clean the response to extract JSON and parse it
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  }
}
