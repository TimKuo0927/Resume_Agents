import 'dotenv/config';
import { GeminiClient } from './ai/GeminiClient.js';
import { JobAnalyzerAgent } from './agents/JobAnalyzerAgent.js';
import { ResumeOptimizerAgent } from './agents/ResumeOptimizerAgent.js';
import { ResumeOutputCheckerAgent } from './agents/ResumeOutputCheckerAgent.js';
import { jobDescription } from './input/InputJobDescripition.js';
import { userResume } from './input/InputResume.js';
import { renderResume } from './pdf/templates/render.js';
import { ResumePdfGenerator } from './pdf/ResumePdfGenerator.js';

async function main() {
  const ai = new GeminiClient();
  const jobAnalyzer = new JobAnalyzerAgent(ai);
  const resumeOptimizer = new ResumeOptimizerAgent(ai);
  const resumeOutputChecker = new ResumeOutputCheckerAgent(ai);
  const pdfGenerator = new ResumePdfGenerator();

  // Agent 1: Job Analysis
  const analysis = await jobAnalyzer.run(jobDescription);
  console.log('Job Analysis:', analysis);

  // Agent 2: Resume Optimization
  var optimizedResume = await resumeOptimizer.run({
    resume: userResume,
    job: analysis,
  });
  console.log('Optimized Resume:', JSON.stringify(optimizedResume, null, 2));

  // Agent 3: Resume Output Checking
  const review = await resumeOutputChecker.run({
    AiUpdatedResume: optimizedResume.resume,
    OriginalJobDescription: jobDescription,
  });
  console.log('Resume Review:', JSON.stringify(review, null, 2));

  if (!review.passed) {
    console.log('Resume review failed. Trying to optimize again based on the review...');
    optimizedResume = await resumeOptimizer.run({
      resume: userResume,
      job: analysis,
      review: review,
    });
  }

  // Generate PDF
  const html = await renderResume({
    name: userResume.name,
    ...optimizedResume,
  });
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  await pdfGenerator.generatePdf(html, `./output/${timestamp}-resume.pdf`);
}

main();
