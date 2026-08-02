export interface Resume {
  name: string;
  email: string;
  summary: string;
  skills: skill[];
  experiences: Experience[];
  educations: Education[];
}

export interface AiOptimizedResume {
  resume: Resume;
  matchScore: number;
  changes: string[];
}

export interface Experience {
  company: string;
  role: string;
  companyLocation: string;
  duration: string;
  bullets: string[];
}

export interface skill {
  skillType: string;
  skillName: string[];
}

export interface Education {
  educationName: string;
  degree: string;
  duration: string;
  summary: string;
}
