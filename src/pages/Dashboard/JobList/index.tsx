import { useAtomValue } from "jotai";
import React, { useState } from "react";
import Card from "../../../components/Card";
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

const JobList: React.FC = () => {
  const jobs = useAtomValue(jobsAtom);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card title="Available Jobs">
      <JobTableWrapper>
        <JobTable>
          <thead>
            <tr>
              <JobTableHeader>Score</JobTableHeader>
              <JobTableHeader>Title</JobTableHeader>{" "}
              {/* Moved Job Title here */}
              <JobTableHeader>Company</JobTableHeader>
              <JobTableHeader>Posted</JobTableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
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
                <JobTableData title={job.title}>{job.title}</JobTableData>{" "}
                {/* Added Job Title Here */}
                <JobTableData title={job.company}>{job.company}</JobTableData>
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
