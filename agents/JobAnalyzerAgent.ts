import type { Agent } from '../models/BaseAgent.js';
import type { JobAnalysis } from '../models/JobAnalysis.js';
import { jobAnalyzerPrompt } from '../prompts/JobAnalysisPrompt.js';
import { GeminiClient } from '../ai/GeminiClient.js';

export class JobAnalyzerAgent implements Agent<string, JobAnalysis> {
  name: string = 'JobAnalyzer';
  constructor(private ai: GeminiClient) {}

  async run(input: string): Promise<JobAnalysis> {
    const prompt = jobAnalyzerPrompt(input);
    const response = await this.ai.generateText(prompt);

    // Clean the response to extract JSON and parse it
    const cleanJson = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  }
}
