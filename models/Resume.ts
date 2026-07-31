export interface Resume {
  name: string;
  email: string;
  summary: string;
  skills: skill[];
  experiences: Experience[];
  educations: Education[];
}

export interface AiOptimizedResume {
  summary: string;
  skills: string[];
  experiences: Experience[];
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
