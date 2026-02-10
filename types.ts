
export interface Course {
  id: string;
  title: string;
  icon: string;
  description: string;
  highlights: string[];
  quote: string;
}

export interface StudentProgress {
  category: string;
  before: number;
  after: number;
}
