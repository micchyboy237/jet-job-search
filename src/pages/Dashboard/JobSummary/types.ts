export interface JobDomainCount {
  domain: string;
  count: number;
}

export interface JobSummaryData {
  totalJobs: number | null;
  meanScore: string | null;
  meanScoresByCategory: Record<string, string>;
  domainCounts: JobDomainCount[];
}
