import type { Resume } from '../models/Resume.js';
import type { JobAnalysis } from '../models/JobAnalysis.js';
import type { Review } from '../models/Review.js';

export function resumeOptimizePrompt(
  resume: Resume,
  job: JobAnalysis,
  review?: Review
) {
  const reviewBlock = review
    ? `
REVIEW FEEDBACK:
- score: ${review.score}
- passed: ${review.passed}
- strengths: ${JSON.stringify(review.strengths)}
- issues: ${JSON.stringify(review.issues, null, 2)}
- missingRequirements: ${JSON.stringify(review.missingRequirements, null, 2)}
`
    : `
REVIEW FEEDBACK:
- No prior review available.
`;

  return `
You are a professional resume optimizer.

JOB ANALYSIS:
${JSON.stringify(job, null, 2)}

CANDIDATE RESUME:
${JSON.stringify(resume, null, 2)}

${reviewBlock}

CRITICAL INSTRUCTIONS:
1. Fix the issues listed in REVIEW FEEDBACK.
2. Do not add unsupported skills, technologies, certifications, or experiences.
3. Only rewrite or reorganize information already present in the candidate resume.
4. If a requirement is missing, do not invent it; instead, keep the resume factual and improve alignment using existing evidence.
5. Preserve all factual data: company names, dates, titles, locations, education, and numerical values.
6. Return ONLY valid JSON.
`.trim();
}
