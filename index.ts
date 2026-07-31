import 'dotenv/config';
import { GeminiClient } from './ai/GeminiClient.js';
import { JobAnalyzerAgent } from './agents/JobAnalyzerAgent.js';
import { ResumeOptimizerAgent } from './agents/ResumeOptimizerAgent.js';
import { jobDescription } from './input/InputJobDescripition.js';
import { userResume } from './input/InputResume.js';
import { renderResume } from './pdf/templates/render.js';
import { ResumePdfGenerator } from './pdf/ResumePdfGenerator.js';

async function main() {
  const ai = new GeminiClient();
  const jobAnalyzer = new JobAnalyzerAgent(ai);
  const resumeOptimizer = new ResumeOptimizerAgent(ai);
  const pdfGenerator = new ResumePdfGenerator();

  const analysis = await jobAnalyzer.run(jobDescription);
  console.log('Job Analysis:', analysis);

  const optimizedResume = await resumeOptimizer.run({
    resume: userResume,
    job: analysis,
  });
  console.log('Optimized Resume:', optimizedResume);

  const html = await renderResume({
    name: userResume.name,

    ...optimizedResume,
  });

  await pdfGenerator.generatePdf(html, '/output/optimized-resume.pdf');
}

main();
