import type { Resume } from '../models/Resume.js';
import type { JobAnalysis } from '../models/JobAnalysis.js';

export function resumeOptimizePrompt(resume: Resume, job: JobAnalysis) {
  return `
You are a professional resume optimizer. 

JOB ANALYSIS:
${JSON.stringify(job, null, 2)}

CANDIDATE RESUME:
${JSON.stringify(resume, null, 2)}

Rules:
1. Never invent fake experience, education, or skills that the candidate does not possess.
2. Only rewrite and enhance existing experiences and summary to align with the target job description.
3. Optimize ATS keywords based on the job analysis.
4. Keep the candidate's original 'name', 'email', and 'educations' intact unless adjustments are needed for formatting.
5. Return ONLY a valid JSON object without any markdown code blocks or additional text.

JSON Output Schema:
{
  "resume": {
    "name": "${resume.name}",
    "email": "${resume.email}",
    "summary": "Optimized professional summary here",
    "skills": [
      {
        "skillType": "Category Name (e.g., Backend & Frameworks)",
        "skillName": ["Skill 1", "Skill 2"]
      }
    ],
    "experiences": [
      {
        "company": "Company Name",
        "role": "Job Title",
        "companyLocation": "City, Country",
        "duration": "Dates",
        "bullets": ["Optimized achievement bullet point 1", "Optimized achievement bullet point 2"]
      }
    ],
    "educations": ${JSON.stringify(resume.educations)}
  },
  "matchScore": 85,
  "changes": [
    "Rewrote summary to emphasize React and Node.js skills",
    "Added ATS keywords: Docker, CI/CD to technical skills"
  ]
}
  `.trim();
}