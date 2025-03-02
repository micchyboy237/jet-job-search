import React from "react";
import Card from "../../../components/Card";
import { SummaryContainer, SummaryItem, ScoreBadge } from "./styles";
import { useAtomValue } from "jotai";
import { jobSummaryHandlerAtom } from "./state";

const JobSummary: React.FC = () => {
  const { totalJobs, meanScore, meanScoresByCategory, domainCounts } =
    useAtomValue(jobSummaryHandlerAtom);

  return (
    <Card title="Job Summary">
      <SummaryContainer>
        <SummaryItem>
          <strong>Total Jobs:</strong> {totalJobs ?? "N/A"}
        </SummaryItem>
        <SummaryItem>
          <strong>Mean Score:</strong>{" "}
          <ScoreBadge>{meanScore ?? "N/A"}</ScoreBadge>
        </SummaryItem>
        {meanScoresByCategory.map(({ category, formatted_score, jobCount }) => (
          <SummaryItem key={category}>
            <strong>
              {category} ({jobCount} jobs):
            </strong>
            <ScoreBadge>{formatted_score}</ScoreBadge>
          </SummaryItem>
        ))}
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
