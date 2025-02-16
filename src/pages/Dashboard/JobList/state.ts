import { atom } from "jotai";
import { Job } from "./types";
import { vectorNodesAtom } from "../JobGraph/state";

export const jobsAtom = atom((get) => {
  return get(vectorNodesAtom).map((node) => {
    const scorePercentage = (node.score * 100).toFixed(2) + "%";
    return {
      id: node.id,
      score: node.score,
      formattedScore: scorePercentage,
      title: node.title,
      description: node.description,
      company: node.company,
      location: node.location || "Remote",
      posted_date: node.posted_date,
      salary: node.salary,
      job_type: node.job_type,
      tags: node.tags,
      link: node.link,
      overview: node.overview,
      domain: node.domain,
    };
  });
});
