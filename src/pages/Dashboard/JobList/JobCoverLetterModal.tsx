import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalClose,
} from "./styles";

interface JobDetailsModalProps {
  job: { id: string; title: string };
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState<{
    subject: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cover letter when modal opens
  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://jetairm1:8002/api/v1/job/cover-letter/${job.id}`
        );
        if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
        const data = await response.json();
        setCoverLetter({
          subject: data.response.subject,
          message: data.response.message,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetter();
  }, [job.id]);

  // Handle cover letter generation
  const generateCoverLetter = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://jetairm1:8002/api/v1/job/cover-letter/generate-cover-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job_id: job.id }),
        }
      );

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      const data = await response.json();
      setCoverLetter({ subject: data.subject, message: data.message });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <span>Job Details: {job.title}</span>
          <ModalClose onClick={onClose}>&times;</ModalClose>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : coverLetter ? (
            <>
              <p>
                <strong>Subject:</strong> {coverLetter.subject}
              </p>
              <p>
                <strong>Message:</strong> {coverLetter.message}
              </p>
            </>
          ) : (
            <p>No cover letter available.</p>
          )}
          <button onClick={generateCoverLetter} disabled={loading}>
            Generate Cover Letter
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JobDetailsModal;
