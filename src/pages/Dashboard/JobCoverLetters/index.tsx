import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  relevantJobsAtom,
  fetchCoverLettersAtom,
  loadingAtom,
  errorAtom,
} from "./state";
import { CoverLetterCard, Container } from "./styles";
import Card from "../../../components/Card";

const JobCoverLetters: React.FC = () => {
  const [coverLetters] = useAtom(relevantJobsAtom);
  const [, fetchCoverLetters] = useAtom(fetchCoverLettersAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  useEffect(() => {
    fetchCoverLetters();
  }, [fetchCoverLetters]);

  return (
    <Card title="Job Cover Letters">
      <Container>
        {loading && <p>Loading cover letters...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {!loading && !error && coverLetters.length > 0
          ? coverLetters.map((letter) => (
              <CoverLetterCard key={letter.id}>
                <h3>{letter.subject || "No Subject"}</h3>
                <p>{letter.message || "No Message Available"}</p>
                <a href={letter.link} target="_blank" rel="noopener noreferrer">
                  View Job Posting
                </a>
              </CoverLetterCard>
            ))
          : !loading && !error && <p>No relevant cover letters found.</p>}
      </Container>
    </Card>
  );
};

export default JobCoverLetters;
