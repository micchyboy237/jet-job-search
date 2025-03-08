import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalClose,
  Container,
} from "./styles";

interface JobDetailsModalProps {
  job: any;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalContent>
      <ModalBody>
        <Container>
          <p>
            <strong>ID:</strong>
            {job.id}
          </p>
          <p>
            <strong>Link:</strong>
            {job.link ? (
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                {job.link}
              </a>
            ) : (
              "No link available"
            )}
          </p>
          <p>
            <strong>Search Keywords:</strong>
            {job.searchKeywords.join(", ") || "None"}
          </p>
          <p>
            <strong>Matched Skills:</strong>
            {job.matched_skills.join(", ") || "None"}
          </p>
          <p>
            <strong>Roles:</strong>
            {job.role.join(", ") || "None"}
          </p>
          <p>
            <strong>Applications:</strong>
            {job.application.join(", ") || "None"}
          </p>
          <p>
            <strong>Tech stack:</strong>
            {job.technology_stack.join(", ") || "None"}
          </p>
          <p>
            <strong>Qualifications:</strong>
            {job.qualifications.join(", ") || "None"}
          </p>
          <p>
            <strong>Posted:</strong>
            {job.posted_date || "Unknown"}
          </p>
          <p>
            <strong>Salary:</strong>
            {job.salary || "Not specified"}
          </p>
          <p>
            <strong>Job Type:</strong>
            {job.job_type || "Full-time"}
          </p>
          <p>
            <strong>Tags:</strong>
            {job.tags.join(", ") || "None"}
          </p>
          <p>
            <strong>Domain:</strong>
            {job.domain || "No domain specified"}
          </p>
          <p>
            <strong>Description:</strong>
            {job.description || "No description provided."}
          </p>
        </Container>
      </ModalBody>
    </ModalContent>
  );
};

export default JobDetailsModal;
