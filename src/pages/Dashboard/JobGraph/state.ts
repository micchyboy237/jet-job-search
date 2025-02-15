import { atom } from "jotai";
import { VectorNode } from "./types";
import { RAG_NODES_URL } from "./config";
import { DEFAULT_FILTERS } from "./constants";
import { toSnakeCase } from "../../../utils/transformers";

const initialVectorNodes: VectorNode[] = [];

export const vectorNodesAtom = atom(initialVectorNodes);
export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);

export const fetchVectorNodesAtom = atom(
  null,
  async (get, set, query: string) => {
    set(loadingAtom, true);
    set(errorAtom, null);

    try {
      const finalOptions = toSnakeCase(DEFAULT_FILTERS);
      const response = await fetch(RAG_NODES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, ...finalOptions }),
      });

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

      const result = await response.json();
      set(vectorNodesAtom, result.data);
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);
