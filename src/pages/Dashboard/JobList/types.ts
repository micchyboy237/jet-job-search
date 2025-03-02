import { VectorNode } from "../JobGraph/types";

export interface Job extends VectorNode {
  searchKeywords: string[];
  formattedScore: string;
}
