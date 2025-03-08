import React, { useEffect, useState } from "react";
import {
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalClose,
  Container,
} from "./styles";
import Button from "../../../components/Button";

interface JobDetailsModalProps {
  job: { id: string; title: string };
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job }) => {
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
    <ModalContent>
      <ModalBody>
        <Button onClick={generateCoverLetter} disabled={loading}>
          Generate Cover Letter
        </Button>
        <Container>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : coverLetter ? (
            <>
              <p>
                <strong>Subject:</strong>
                {coverLetter.subject}
              </p>
              <p>
                <strong>Message:</strong>
                {coverLetter.message}
              </p>
            </>
          ) : (
            <p>No cover letter available.</p>
          )}
        </Container>
      </ModalBody>
    </ModalContent>
  );
};

export default JobDetailsModal;
