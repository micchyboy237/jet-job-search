import React from "react";
import Card from "../../../components/Card";
import { SummaryContainer, SummaryItem, ScoreBadge } from "./styles";
import { useAtomValue } from "jotai";
import { jobSummaryHandlerAtom } from "./state";

const JobSummary: React.FC = () => {
  const {
    totalJobs,
    meanScore,
    meanScoresByCategory,
    domainCounts,
    skillKeywordCounts,
    skillCombinationCounts,
  } = useAtomValue(jobSummaryHandlerAtom);

  const handleCopy = (data: any[]) => {
    const textToCopy = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <Card title="Job Summary">
      <SummaryContainer>
        <SummaryItem onClick={() => handleCopy([totalJobs])}>
          <strong>Total Jobs:</strong> {totalJobs ?? "N/A"}
        </SummaryItem>
        <SummaryItem onClick={() => handleCopy([meanScore])}>
          <strong>Mean Score:</strong>{" "}
          <ScoreBadge>{meanScore ?? "N/A"}</ScoreBadge>
        </SummaryItem>
        {meanScoresByCategory.map(({ category, formatted_score, jobCount }) => (
          <SummaryItem
            key={category}
            onClick={() => handleCopy([formatted_score, jobCount])}
          >
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
            <SummaryItem
              key={domain}
              onClick={() => handleCopy([domain, count])}
            >
              <strong>{domain}:</strong> {count}
            </SummaryItem>
          ))
        ) : (
          <SummaryItem>No domains available</SummaryItem>
        )}
      </SummaryContainer>
      <SummaryContainer>
        <h3>Skill Keyword Matches</h3>
        {skillKeywordCounts.length > 0 ? (
          skillKeywordCounts.map(({ skill, count }) => (
            <SummaryItem key={skill} onClick={() => handleCopy([skill, count])}>
              <strong>{skill}:</strong> {count}
            </SummaryItem>
          ))
        ) : (
          <SummaryItem>No skills matched</SummaryItem>
        )}
      </SummaryContainer>
      <SummaryContainer>
        <h3>Skill Combination Matches</h3>
        {skillCombinationCounts.length > 0 ? (
          skillCombinationCounts.map(({ combination, count }, index) => (
            <SummaryItem
              key={index}
              onClick={() => handleCopy([...combination, count])}
            >
              <strong>{combination.join(", ")}:</strong> {count}
            </SummaryItem>
          ))
        ) : (
          <SummaryItem>No skill combinations matched</SummaryItem>
        )}
      </SummaryContainer>
    </Card>
  );
};

export default JobSummary;
