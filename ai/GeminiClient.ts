import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
  private model;

  constructor() {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
      throw new Error('GOOGLE_API_KEY environment variable is not set.');
    }

    const genAI = new GoogleGenerativeAI(key);

    this.model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
    });
  }

  async generateText(prompt: string) {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
