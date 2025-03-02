import { atom } from "jotai";
import { JobSummaryData } from "./types";
import { vectorNodesAtom } from "../JobGraph/state";
import { VectorNode } from "../JobGraph/types";

export const jobSummaryHandlerAtom = atom<JobSummaryData>((get) => {
  const vectorNodes = get(vectorNodesAtom);
  const totalJobs = vectorNodes.length;
  const meanScore =
    totalJobs > 0
      ? (
          vectorNodes.reduce((acc, node) => acc + node.score, 0) / totalJobs
        ).toFixed(2) // Ensuring meanScore is always a string
      : null;

  return { totalJobs, meanScore };
});
