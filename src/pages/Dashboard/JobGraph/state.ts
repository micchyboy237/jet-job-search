import { atom } from "jotai";
import { VectorNode, JobResult, QueryOptions } from "./types";
import { RAG_NODES_URL } from "./config";
import { DEFAULT_FILTERS } from "./constants";
import { toSnakeCase } from "../../../utils/transformers";

const initialVectorNodes: VectorNode[] = [];

export const vectorNodesAtom = atom(initialVectorNodes);
export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);

export const fetchVectorNodesAtom = atom(
  null,
  async (get, set, query: string, filters?: QueryOptions) => {
    set(loadingAtom, true);
    set(errorAtom, null);

    try {
      const finalOptions = toSnakeCase({ ...DEFAULT_FILTERS, ...filters });
      const response = await fetch(RAG_NODES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, ...finalOptions }),
      });

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      const result: { data: JobResult[] } = await response.json();

      const vectorNodes: VectorNode[] = result.data.map((job) => ({
        id: job.id,
        score: job.score,
        description: job.text,
        ...job.metadata,
      }));

      set(vectorNodesAtom, vectorNodes);
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);
