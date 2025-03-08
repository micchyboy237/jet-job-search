import { atom } from "jotai";
import { Job } from "./types";
import { vectorNodesAtom } from "../JobSearch/state";

export const jobsAtom = atom<Job[]>((get) => {
  return get(vectorNodesAtom).map((node): Job => {
    const scorePercentage = (node.score * 100).toFixed(2) + "%";

    return {
      id: node.id,
      score: node.score,
      title: node.title,
      description: node.description,
      company: node.company,
      posted_date: node.posted_date,
      salary: node.salary,
      job_type: node.job_type,
      hours_per_week: node.hours_per_week,
      tags: node.tags,
      link: node.link,
      domain: node.domain,
      searchKeywords: node.keywords,
      matched_skills: node.matched_skills,
      role: node.role || [],
      application: node.application || [],
      technology_stack: node.technology_stack || [],
      qualifications: node.qualifications || [],

      formattedScore: scorePercentage,
    };
  });
});
