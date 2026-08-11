# Resume Agents

A lightweight Node.js + TypeScript project that uses a generative AI model (Gemini) to analyze job descriptions and produce an AI-optimized resume, rendered to HTML and exported as a PDF.

## What this is

Resume Agents automates tailoring a candidate's resume for a specific job posting. It runs two small AI agents:

- JobAnalyzerAgent — extracts structured job information (company, title, skills, responsibilities, requirements, etc.) from a job description.
- ResumeOptimizerAgent — rewrites and organizes the candidate's existing resume content to better match the job, producing an optimized resume JSON and a match score.

The project wires these agents together, renders the optimized resume using HTML templates, and generates a PDF via Puppeteer.

## Stack

- Language: TypeScript + HTML
- Runtime: Node.js (ESM)
- Notable libraries:
  - @google/generative-ai (Gemini model)
  - puppeteer (PDF rendering)
  - handlebars (templating)
  - dotenv (environment variable loading)

## Key implementation notes

- Agents implement the generic `Agent<I, O>` interface (models/BaseAgent.ts).
- GeminiClient expects the `GOOGLE_API_KEY` environment variable and instantiates a model with `model: 'gemini-3.5-flash'`.
- Prompts return strictly JSON output; agents strip markdown fences and parse the JSON returned by the model.
- Output schema:
  - JobAnalysis: companyName, jobTitle, jobDescription, seniority, skills, salaryRange?, location, responsibilities, requirements.
  - AiOptimizedResume: { resume: Resume, matchScore: number, changes: string[] } where `resume` follows the Resume interface in models/Resume.ts.

## Getting started

1. Clone and install

```bash
git clone https://github.com/TimKuo0927/Resume_Agents.git
cd Resume_Agents
npm install
2. Create a .env file with your Google Generative AI key (or set the env var directly):
GOOGLE_API_KEY=your_api_key_here
3. Run the app (development)
npm run dev
# This runs `tsx index.ts`



```
