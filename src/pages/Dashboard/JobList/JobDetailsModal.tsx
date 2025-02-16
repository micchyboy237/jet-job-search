import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalClose,
} from "./styles";

interface JobDetailsModalProps {
  job: any;
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Modal onClick={handleBackdropClick}>
      <ModalContent>
        <ModalHeader>
          {job.company} - {job.description}
          <ModalClose onClick={onClose}>&times;</ModalClose>
        </ModalHeader>
        <ModalBody>
          <p>
            <strong>Location:</strong> {job.location || "Not specified"}
          </p>
          <p>
            <strong>Posted:</strong> {job.posted_date || "Unknown"}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary || "Not specified"}
          </p>
          <p>
            <strong>Job Type:</strong> {job.job_type || "Full-time"}
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JobDetailsModal;
