import { atom } from "jotai";
import { Job } from "./types";
import { vectorNodesAtom } from "../JobGraph/state";

export const jobsAtom = atom((get) => {
  return get(vectorNodesAtom).map((node) => ({
    id: node.id,
    score: node.score,
    description: node.description,
    company:
      node.tags.find((tag) => tag.includes("Company:"))?.split(":")[1] ||
      "Unknown",
    location:
      node.tags.find((tag) => tag.includes("Location:"))?.split(":")[1] ||
      "Remote",
    posted_date:
      node.tags.find((tag) => tag.includes("Posted:"))?.split(":")[1] || "N/A",
    salary:
      node.tags.find((tag) => tag.includes("Salary:"))?.split(":")[1] ||
      "Not specified",
    job_type:
      node.tags.find((tag) => tag.includes("Job Type:"))?.split(":")[1] ||
      "Full-time",
    tags: node.tags.filter((tag) => !tag.includes(":")), // Exclude structured tags
  }));
});
