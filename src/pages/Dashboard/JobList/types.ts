import { VectorNode } from "../JobSearch/types";

export interface Job extends VectorNode {
  searchKeywords: string[];
  formattedScore: string;
}
