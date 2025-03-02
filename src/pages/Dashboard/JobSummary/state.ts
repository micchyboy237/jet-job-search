import { atom } from "jotai";
import { JobDomainCount, JobSummaryData } from "./types";
import { vectorNodesAtom } from "../JobGraph/state";
import { VectorNode } from "../JobGraph/types";

export const jobSummaryHandlerAtom = atom<JobSummaryData>((get) => {
  const vectorNodes: VectorNode[] = get(vectorNodesAtom);
  const totalJobs = vectorNodes.length;

  // Initialize score categories
  const categories = { High: [], Medium: [], Low: [] };

  vectorNodes.forEach((node) => {
    if (node.score >= 0.7) categories.High.push(node.score);
    else if (node.score >= 0.4) categories.Medium.push(node.score);
    else categories.Low.push(node.score);
  });

  // Compute mean scores per category
  const meanScoresByCategory = Object.fromEntries(
    Object.entries(categories).map(([key, scores]) => [
      key,
      scores.length > 0
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
        : "N/A",
    ])
  );

  const meanScore =
    totalJobs > 0
      ? (
          vectorNodes.reduce((acc, node) => acc + node.score, 0) / totalJobs
        ).toFixed(2)
      : null;

  const domainCounts = vectorNodes.reduce((acc, node) => {
    const item = acc.find((a) => a.domain === node.domain) || {
      domain: node.domain,
      count: 0,
    };
    item.count++;

    if (!acc.includes(item)) {
      acc.push(item);
    }

    return acc;
  }, [] as JobDomainCount[]);

  return { totalJobs, meanScore, meanScoresByCategory, domainCounts };
});
