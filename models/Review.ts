export interface Review {
  score: number;
  passed: boolean;
  strengths: string[];
  issues: issue[];
  missingRequirements: string[];
}

interface issue {
  section: string;
  problem: string;
  suggestion: string;
}
