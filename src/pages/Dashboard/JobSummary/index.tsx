import React from "react";
import Card from "../../../components/Card";
import { SummaryContainer, SummaryItem } from "./styles";
import { useAtomValue } from "jotai";
import { jobSummaryHandlerAtom } from "./state";

const JobSummary: React.FC = () => {
  const { totalJobs, meanScore } = useAtomValue(jobSummaryHandlerAtom); // Use derived state

  return (
    <Card title="Job Summary">
      <SummaryContainer>
        <SummaryItem>
          <strong>Total Jobs:</strong> {totalJobs ?? "N/A"}
        </SummaryItem>
        <SummaryItem>
          <strong>Mean Score:</strong> {meanScore ?? "N/A"}
        </SummaryItem>
      </SummaryContainer>
    </Card>
  );
};

export default JobSummary;
