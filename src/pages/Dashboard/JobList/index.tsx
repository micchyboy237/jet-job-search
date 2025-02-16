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
import { format } from "date-fns";
import JobDetailsModal from "./JobDetailsModal";
import Card from "../../../components/Card";

const JobList: React.FC = () => {
  const jobs = useAtomValue(jobsAtom);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: "score", direction: "desc" });
  const itemsPerPage = 10;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const sortedJobs = [...paginatedJobs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return (
    <Card title="Available Jobs">
      <JobTableWrapper>
        <JobTable>
          <thead>
            <tr>
              <JobTableHeader onClick={() => handleSort("score")}>
                Score
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("title")}>
                Title
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("company")}>
                Company
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("location")}>
                Location
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("salary")}>
                Salary
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("job_type")}>
                Job Type
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("tags")}>
                Tags
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("link")}>
                Link
              </JobTableHeader>
              <JobTableHeader onClick={() => handleSort("posted_date")}>
                Posted
              </JobTableHeader>
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job) => (
              <JobTableRow key={job.id} onClick={() => setSelectedJob(job)}>
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
                <JobTableData title={job.title}>{job.title}</JobTableData>
                <JobTableData title={job.company}>{job.company}</JobTableData>
                <JobTableData>{job.location}</JobTableData>
                <JobTableData>{job.salary}</JobTableData>
                <JobTableData>{job.job_type}</JobTableData>
                <JobTableData>{job.tags.join(", ")}</JobTableData>
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
              </JobTableRow>
            ))}
          </tbody>
        </JobTable>
      </JobTableWrapper>
      {/* Pagination Controls */}
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
