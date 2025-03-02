export interface JobDomainCount {
  domain: string;
  count: number;
}

export interface MeanScoresByCategory {
  formatted_score: string;
  category: "High" | "Medium" | "Low"; // Min Score: 0.7, 0.4, 0.0
  jobCount: number;
}

export interface JobSummaryData {
  totalJobs: number | null;
  meanScore: string | null;
  meanScoresByCategory: MeanScoresByCategory[];
  domainCounts: JobDomainCount[];
}
