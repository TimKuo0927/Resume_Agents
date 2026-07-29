export function jobAnalyzerPrompt(job: string) {
  return `

You are a Job Analyzer Agent.

Analyze this job description.

Return ONLY JSON.

Schema:

{
 companyName:"",
 jobTitle:"",
 jobDescription:"",
 seniority:"",
 skills:[],
 salaryRange?: {
     min: number;
     max: number;
 },
 location:"",
 responsibilities:[],
 requirements:[]
}


Job Description:

${job}

`;
}
