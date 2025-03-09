import { atom } from "jotai";
import { VectorNode, JobResult, QueryOptions, UIOptions } from "./types";
import { RAG_NODES_URL } from "./config";
import {
  DEFAULT_FILTERS,
  DEFAULT_UI_FILTERS,
  MY_SKILLS_KEYWORDS,
} from "./constants";
import { toSnakeCase } from "../../../utils/transformers";
import { sortWithPriority } from "../../../utils/sort";

const initialVectorNodes: VectorNode[] = [];

export const queryAtom = atom<string>("");
export const searchKeywordsAtom = atom((get) =>
  get(queryAtom)
    .split(",")
    .map((item) => item.trim())
    .filter((item) => !!item)
);

export const baseVectorNodesAtom = atom(initialVectorNodes);
export const vectorNodesAtom = atom(initialVectorNodes);
export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);
export const filtersAtom = atom<QueryOptions>(DEFAULT_FILTERS);
export const uiFiltersAtom = atom<UIOptions>(DEFAULT_UI_FILTERS);

export const fetchVectorNodesAtom = atom(
  null,
  async (get, set, query: string) => {
    set(loadingAtom, true);
    set(errorAtom, null);
    const filters = get(filtersAtom);
    const uiFilters = get(uiFiltersHandlerAtom);

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
        score: job.score,
        description: job.text,
        title: job.title,
        ...job.metadata,
        id: job.id,
      }));

      const searchKeywords = query
        .split(",")
        .map((item) => item.trim())
        .filter((item) => !!item);
      // const searchKeywords = MY_SKILLS_KEYWORDS;

      const updatedVectorNodes: VectorNode[] = vectorNodes.map((node) => {
        const nodeTechnologyStack = node.entities.technology_stack
          .map((item) => item)
          .filter((item) => !!item);
        const nodeApplication = (node?.entities.application || [])
          .map((item) => item)
          .filter((item) => !!item);
        const baseSkillKeywords = [
          ...nodeTechnologyStack,
          ...nodeApplication,
        ].map((item) => item);

        const baseSearchKeywords = [...node.keywords, ...baseSkillKeywords].map(
          (item) => item
        );

        const matchedSearchKeywords = Array.from(
          new Set(
            baseSearchKeywords
              .filter((baseSearchKeyword) =>
                searchKeywords.some((searchKeyword) => {
                  return baseSearchKeyword == searchKeyword;
                })
              )
              .map((keyword) => keyword)
          )
        );

        const matchedSkillsKeywords = Array.from(
          new Set(
            baseSkillKeywords
              .filter((baseSkillKeyword) =>
                MY_SKILLS_KEYWORDS.some((matchedSkillKeyword) => {
                  return matchedSkillKeyword == baseSkillKeyword;
                })
              )
              .map((keyword) => keyword)
          )
        );

        const priorityKeywords = [...searchKeywords, ...MY_SKILLS_KEYWORDS];
        const sortedTechnologyStack = sortWithPriority(
          nodeTechnologyStack,
          priorityKeywords
        );
        const sortedApplications = sortWithPriority(
          nodeApplication,
          priorityKeywords
        );
        const sortedKeywords = sortWithPriority(
          matchedSearchKeywords,
          priorityKeywords
        );
        const sortedMatchedSkills = sortWithPriority(
          matchedSkillsKeywords,
          priorityKeywords
        );
        const result: VectorNode = {
          ...node,
          technology_stack: sortedTechnologyStack,
          application: sortedApplications,
          keywords: sortedKeywords,
          matched_skills: sortedMatchedSkills,
        };

        return result;
      });

      set(baseVectorNodesAtom, updatedVectorNodes);
      // set(vectorNodesAtom, updatedVectorNodes);

      set(uiFiltersHandlerAtom, { ...uiFilters, keywords: searchKeywords });
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);

// This atom updates both `uiFiltersAtom` and `vectorNodesAtom`
export const uiFiltersHandlerAtom = atom(
  (get) => get(uiFiltersAtom),
  (get, set, newFilters: UIOptions) => {
    set(uiFiltersAtom, newFilters); // Update the filters state

    const baseVectorNodes = get(baseVectorNodesAtom);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const updatedVectorNodes = baseVectorNodes.filter((node) => {
      const postedDate = new Date(node.posted_date);
      postedDate.setHours(0, 0, 0, 0); // Normalize to start of the day

      const diffDays =
        (today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24);

      const matchesDays =
        newFilters.days > 0 ? diffDays <= newFilters.days : true;

      // const filtersKeywords = newFilters.keywords.map((item) =>
      //   item
      // );
      // const baseKeywords = [...node.keywords, ...node.entities.technology_stack].map(
      //   (item) => item
      // );
      // const matchesKeywords =
      //   filtersKeywords.length > 0
      //     ? baseKeywords.some((keyword) => filtersKeywords.includes(keyword))
      //     : true;

      // return matchesDays && matchesKeywords; // Apply AND condition
      return matchesDays;
    });

    set(vectorNodesAtom, updatedVectorNodes); // Update the nodes state
  }
);
