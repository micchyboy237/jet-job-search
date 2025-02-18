import { atom } from "jotai";
import { JobEntity } from "./types";
import { NER_ENTITIES_URL } from "./config";

const initialJobEntities: JobEntity[] = [];

export const jobEntitiesAtom = atom(initialJobEntities);
export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);

export const fetchJobEntitiesAtom = atom(
  null,
  async (get, set, query?: string) => {
    set(loadingAtom, true);
    set(errorAtom, null);

    try {
      const response = await fetch(NER_ENTITIES_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      const result: { data: JobEntity[] } = await response.json();
      const jobEntities: JobEntity[] = result.data;
      set(jobEntitiesAtom, jobEntities);
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);
