type Mode = "fusion" | "hierarchy" | "deeplake" | "faiss" | "graph_nx";

type SplitMode = "markdown" | "hierarchy";

type BaseFilter = {
  name: string;
  key: string;
  type: FilterType;
  placeholder?: string;
};

export type FilterType =
  | "text"
  | "number"
  | "boolean"
  | "radio"
  | "select"
  | "checkbox"
  | "list";

// Discriminated union with `value` and `options` tailored per type
export type Filter =
  | (BaseFilter & {
      type: "text";
      value?: string;
    })
  | (BaseFilter & {
      type: "number";
      value?: number;
    })
  | (BaseFilter & {
      type: "boolean";
      value?: boolean;
    })
  | (BaseFilter & {
      type: "radio" | "select";
      options: string[];
      value?: string;
    })
  | (BaseFilter & {
      type: "checkbox";
      options: string[];
      value?: string | string[];
    })
  | (BaseFilter & {
      type: "list";
      options: string[] | number[];
      value?: string[]; // Array of strings
    });

type FusionMode =
  | "reciprocal_rerank"
  | "relative_score"
  | "dist_based_score"
  | "simple";

export interface QueryOptions {
  rag_dir: string;
  extensions: string[];
  json_attributes: string[];
  system: string;
  chunk_size: number;
  chunk_overlap: number;
  sub_chunk_sizes: number[];
  with_hierarchy: boolean;
  top_k: number | null;
  model: string;
  embed_model: string;
  mode: Mode;
  store_path: string;
  score_threshold: number;
  split_mode: SplitMode[];
  fusion_mode: FusionMode;
}

export interface VectorNodeMetadata {
  [key: string]: any; // Allowing any attribute values in metadata
}

export interface VectorNode {
  id: string;
  score: number; // Float
  title: string;
  description: string;
  link: string;
  company: string;
  posted_date: string;
  salary: string;
  job_type: string;
  overview: string;
  tags: string[];
  domain: string;
  location: string | null;
}

export interface JobGraph {}

export interface JobResult {
  id: string;
  score: number;
  text: string;
  metadata: {
    id: string;
    link: string;
    company: string;
    posted_date: string;
    salary: string;
    job_type: string;
    overview: string;
    tags: string[];
    domain: string;
    location: string | null;
  };
}
