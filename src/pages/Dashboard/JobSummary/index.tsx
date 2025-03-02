import React from "react";
import Card from "../../../components/Card";
import { SummaryContainer, SummaryItem } from "./styles";
import { useAtomValue } from "jotai";
import { jobSummaryHandlerAtom } from "./state";

const JobSummary: React.FC = () => {
  const { totalJobs, meanScore, meanScoresByCategory, domainCounts } =
    useAtomValue(jobSummaryHandlerAtom);

  return (
    <Card title="Job Summary">
      <SummaryContainer>
        {/* <SummaryItem>
          <strong>Total Jobs:</strong> {totalJobs ?? "N/A"}
        </SummaryItem> */}
        <SummaryItem>
          <strong>Mean Score:</strong> {meanScore ?? "N/A"}
        </SummaryItem>
        <SummaryItem>
          <strong>High (≥ 0.7):</strong> {meanScoresByCategory.High}
        </SummaryItem>
        <SummaryItem>
          <strong>Medium (≥ 0.4):</strong> {meanScoresByCategory.Medium}
        </SummaryItem>
        <SummaryItem>
          <strong>Low (≥ 0.0):</strong> {meanScoresByCategory.Low}
        </SummaryItem>
      </SummaryContainer>

      <SummaryContainer>
        {domainCounts.length > 0 ? (
          domainCounts.map(({ domain, count }) => (
            <SummaryItem key={domain}>
              <strong>{domain}:</strong> {count}
            </SummaryItem>
          ))
        ) : (
          <SummaryItem>No domains available</SummaryItem>
        )}
      </SummaryContainer>
    </Card>
  );
};

export default JobSummary;
