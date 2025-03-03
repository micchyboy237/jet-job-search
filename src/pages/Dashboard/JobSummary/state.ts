import { atom } from "jotai";
import {
  JobDomainCount,
  JobSummaryData,
  MeanScoresByCategory,
  SkillKeywordCount,
} from "./types";
import { vectorNodesAtom } from "../JobGraph/state";
import { VectorNode } from "../JobGraph/types";
import { MY_SKILLS_KEYWORDS } from "../JobGraph/constants";

export const jobSummaryHandlerAtom = atom<JobSummaryData>((get) => {
  const vectorNodes: VectorNode[] = get(vectorNodesAtom);
  const totalJobs = vectorNodes.length;

  const categories: Record<"High" | "Medium" | "Low", number[]> = {
    High: [],
    Medium: [],
    Low: [],
  };

  const skillKeywordCounts: SkillKeywordCount[] = MY_SKILLS_KEYWORDS.map(
    (skill) => ({
      skill,
      count: 0,
    })
  );

  vectorNodes.forEach((node) => {
    if (node.score >= 0.7) categories.High.push(node.score);
    else if (node.score >= 0.4) categories.Medium.push(node.score);
    else categories.Low.push(node.score);

    MY_SKILLS_KEYWORDS.forEach((skill) => {
      if (node.matched_skills.includes(skill)) {
        const skillEntry = skillKeywordCounts.find((s) => s.skill === skill);
        if (skillEntry) skillEntry.count++;
      }
    });
  });

  const meanScoresByCategory: MeanScoresByCategory[] = Object.entries(
    categories
  ).map(([key, scores]) => ({
    category: key as "High" | "Medium" | "Low",
    formatted_score:
      scores.length > 0
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
        : "N/A",
    jobCount: scores.length,
  }));

  const meanScore =
    totalJobs > 0
      ? (
          vectorNodes.reduce((acc, node) => acc + node.score, 0) / totalJobs
        ).toFixed(2)
      : null;

  const domainCounts = vectorNodes.reduce<JobDomainCount[]>((acc, node) => {
    const existing = acc.find((a) => a.domain === node.domain);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ domain: node.domain, count: 1 });
    }
    return acc;
  }, []);

  return {
    totalJobs,
    meanScore,
    meanScoresByCategory,
    domainCounts,
    skillKeywordCounts,
  };
});
