import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { jobsAtom } from "./state";
import {
  JobTableWrapper,
  JobTable,
  JobTableData,
  JobTableHeader,
  JobTableRow,
  PaginationWrapper,
  PaginationButton,
  Score,
} from "./styles";
import {
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import JobDetailsModal from "./JobDetailsModal";
import Card from "../../../components/Card";

// Helper function to calculate the time ago string
const getTimeAgo = (date: string) => {
  const parsedDate = parseISO(date);

  // Set parsed date to the last second of the day
  parsedDate.setHours(23, 59, 59, 999);

  // Set today's base to the first second of the day
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // If parsed date is in the future, return "Today"
  if (parsedDate > startOfToday) {
    return "Today";
  }

  // Get the time difference string
  const timeAgo = formatDistance(parsedDate, startOfToday, { addSuffix: true });

  // If timeAgo is "less than a minute ago", return "Today"
  return timeAgo.includes("less than a minute") ? "Today" : timeAgo;
};

const getTimeAgoTimestamp = (date: string) => {
  const parsedDate = parseISO(date);

  // Set parsed date to the last second of the day
  parsedDate.setHours(23, 59, 59, 999);

  // Set today's base to the first second of the day
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Return timestamp for proper sorting
  return parsedDate.getTime();
};

const JobList: React.FC = () => {
  const jobs = useAtomValue(jobsAtom);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "posted_date",
    direction: "desc",
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  // Step 1: Sort all jobs before pagination
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortConfig.key === "score") {
      const getScoreCategory = (score) => {
        if (score >= 0.7) return 3; // High
        if (score >= 0.4) return 2; // Medium
        return 1; // Low
      };

      const aCategory = getScoreCategory(a.score);
      const bCategory = getScoreCategory(b.score);

      // Primary sort by score category
      const categorySort =
        sortConfig.direction === "asc"
          ? aCategory - bCategory
          : bCategory - aCategory;
      if (categorySort !== 0) return categorySort;

      // Secondary sort within category by posted_date (descending always)
      return (
        new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
      );
    }

    let aValue, bValue;
    if (sortConfig.key === "posted_date") {
      aValue = new Date(a.posted_date).getTime();
      bValue = new Date(b.posted_date).getTime();
    } else if (sortConfig.key === "timeAgo") {
      aValue = getTimeAgoTimestamp(a.posted_date);
      bValue = getTimeAgoTimestamp(b.posted_date);
    } else if (sortConfig.key === "keywords") {
      aValue = a.keywords.length;
      bValue = b.keywords.length;
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Step 2: Get paginated jobs from sorted data
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  return (
    <Card title="Available Jobs">
      <JobTableWrapper>
        <JobTable>
          <thead>
            <tr>
              <JobTableHeader onClick={() => handleSort("timeAgo")}>
                Time Ago
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("title")}>
                Title
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("company")}>
                Company
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("keywords")}>
                Keywords
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("technology_stack")}>
                Tech stack
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("salary")}>
                Salary
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("job_type")}>
                Job Type
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("link")}>
                Link
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("posted_date")}>
                Posted
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("score")}>
                Score
              </JobTableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <JobTableRow
                key={JSON.stringify(job)}
                onClick={() => setSelectedJob(job)}
              >
                <JobTableData>{getTimeAgo(job.posted_date)}</JobTableData>
                <JobTableData title={job.title}>{job.title}</JobTableData>
                <JobTableData title={job.company}>{job.company}</JobTableData>
                <JobTableData>{job.keywords.join(", ")}</JobTableData>
                <JobTableData>{job.technology_stack.join(", ")}</JobTableData>
                <JobTableData>{job.salary}</JobTableData>
                <JobTableData>{job.job_type}</JobTableData>
                <JobTableData>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.link ? "View Job" : "No Link"}
                  </a>
                </JobTableData>
                <JobTableData>
                  {job.posted_date &&
                  !isNaN(new Date(job.posted_date).getTime())
                    ? format(new Date(job.posted_date), "MMM d, yyyy")
                    : "Unknown"}
                </JobTableData>
                <JobTableData>
                  <Score
                    className={
                      job.score >= 0.7
                        ? "high"
                        : job.score >= 0.4
                        ? "medium"
                        : "low"
                    }
                  >
                    {job.formattedScore}
                  </Score>
                </JobTableData>
              </JobTableRow>
            ))}
          </tbody>
        </JobTable>
      </JobTableWrapper>
      <PaginationWrapper>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </PaginationButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </PaginationButton>
      </PaginationWrapper>
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </Card>
  );
};

export default JobList;
