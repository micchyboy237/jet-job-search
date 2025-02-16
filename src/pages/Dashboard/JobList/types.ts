export interface Job {
  id: string;
  score: number;
  formattedScore: string;
  title: string;
  description: string;
  company: string;
  location: string | null;
  posted_date: string;
  salary: string;
  job_type: string;
  tags: string[];
  link: string; // Added link to the job
}
