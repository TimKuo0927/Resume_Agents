import type { Resume } from '../models/Resume.js';
import type { JobAnalysis } from '../models/JobAnalysis.js';

export function resumeOptimizePrompt(resume: Resume, job: JobAnalysis) {
  return `
  You are a professional resume optimizer.
    JOB:${JSON.stringify(job)}

    CANDIDATE RESUME:${JSON.stringify(resume)}

    Rules:

    1. Never invent experience.

    2. Only rewrite existing experience.

    3. Optimize ATS keywords.

    4. Return JSON only.



    Schema:

    {
    summary:"",
    skills:[],
    experiences:[],
    matchScore:0,
    changes:[]
    }

  `;
}
