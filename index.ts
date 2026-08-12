import 'dotenv/config';
import { GeminiClient } from './ai/GeminiClient.js';
import { JobAnalyzerAgent } from './agents/JobAnalyzerAgent.js';
import { ResumeOptimizerAgent } from './agents/ResumeOptimizerAgent.js';
import { ResumeOutputCheckerAgent } from './agents/ResumeOutputCheckerAgent.js';
import { jobDescription } from './input/InputJobDescripition.js';
import { userOriginalResume } from './input/InputResume.js';
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
    resume: userOriginalResume,
    job: analysis,
  });
  console.log('Optimized Resume:', JSON.stringify(optimizedResume, null, 2));

  // Agent 3: Resume Output Checking
  let review = await resumeOutputChecker.run({
    AiUpdatedResume: optimizedResume.resume,
    OriginalJobDescription: jobDescription,
  });
  console.log('Resume Review:', JSON.stringify(review, null, 2));

  let bestResume = optimizedResume;
  let bestReview = review;

  if (!review.passed) {
    const MAX_RETRIES = 2;

    for (let i = 0; i < MAX_RETRIES; i++) {
      console.log(
        `Retrying optimization... Attempt ${i + 1} of ${MAX_RETRIES}`
      );

      const candidate = await resumeOptimizer.run({
        resume: bestResume.resume,
        job: analysis,
        review: review,
      });

      const nextReview = await resumeOutputChecker.run({
        AiUpdatedResume: candidate.resume,
        OriginalJobDescription: jobDescription,
      });

      if (nextReview.score > bestReview.score) {
        bestResume = candidate;
        bestReview = nextReview;
      }

      review = nextReview;

      if (review.passed) {
        break;
      }
    }
  }
  // Generate PDF
  const html = await renderResume({
    name: userOriginalResume.name,
    ...bestResume,
  });
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  await pdfGenerator.generatePdf(html, `./output/${timestamp}-resume.pdf`);
}

main();
