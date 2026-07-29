export interface JobAnalysis {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  seniority: 'entry' | 'mid' | 'senior' | 'unknown';
  skills: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  location: string;
  responsibilities: string[];
  requirements: string[];
}
