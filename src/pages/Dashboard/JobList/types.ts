export interface Job {
  id: string;
  score: number;
  formattedScore: string;
  title: string; // Added Job Title
  description: string;
  company: string;
  location: string | null;
  posted_date: string;
  salary: string;
  job_type: string;
  tags: string[];
}
