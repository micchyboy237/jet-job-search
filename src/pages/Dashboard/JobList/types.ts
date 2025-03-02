import { VectorNode } from "../JobGraph/types";

export interface Job extends VectorNode {
  formattedScore: string;
}
