export interface Job {
  id: string;
  score: number;
  description: string;
  company: string;
  location: string | null;
  posted_date: string;
  salary: string;
  job_type: string;
  tags: string[];
}
