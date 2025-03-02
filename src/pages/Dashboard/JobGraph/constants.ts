import { Filter, QueryOptions, UIOptions } from "./types";

export const DEFAULT_FILTERS: QueryOptions = {
  rag_dir:
    "/Users/jethroestrada/Desktop/External_Projects/Jet_Projects/my-jobs/saved/jobs.json",
  extensions: [".md", ".mdx", ".rst"],
  json_attributes: [
    "title",
    // "keywords",
    // "entities.role",
    // "entities.application",
    // "entities.technology_stack",
    // "entities.qualifications",
    // "tags",
    "details",
  ],
  exclude_json_attributes: [],
  // metadata_attributes: ["entities"],
  metadata_attributes: [
    "id",
    "title",
    "link",
    "company",
    "posted_date",
    "salary",
    "job_type",
    "hours_per_week",
    "domain",
    "tags",
    "keywords",
    "entities.role",
    "entities.application",
    "entities.technology_stack",
    "entities.qualifications",
  ],
  system: `You are a job applicant providing tailored responses during an interview.
  Always answer questions using the provided context as if it is your resume, 
  and avoid referencing the context directly.
  Some rules to follow:
  1. Never directly mention the context or say 'According to my resume' or similar phrases.
  2. Provide responses as if you are the individual described in the context, focusing on professionalism and relevance.`,
  chunk_size: null,
  chunk_overlap: 40,
  sub_chunk_sizes: [512, 256, 128],
  with_hierarchy: false,
  top_k: null,
  model: "llama3.2",
  embed_model: "mxbai-embed-large",
  mode: "fusion",
  store_path:
    "/Users/jethroestrada/Desktop/External_Projects/Jet_Projects/jet_server/.cache/deeplake/store_1",
  score_threshold: 0.0,
  split_mode: [],
  fusion_mode: "relative_score",
  disable_chunking: true,
};

export const DEFAULT_UI_FILTERS: UIOptions = {
  days: 5,
  keywords: [],
};

export const DEFAULT_FILTER_OPTIONS: Array<Filter> = [
  // {
  //   name: "RAG Directory",
  //   key: "rag_dir",
  //   type: "text",
  //   placeholder: "Enter RAG directory path",
  // },
  // {
  //   name: "File Extensions",
  //   key: "extensions",
  //   type: "text",
  //   placeholder: "Enter file extensions",
  // },
  // {
  //   name: "JSON Attributes",
  //   key: "json_attributes",
  //   type: "text",
  //   placeholder: "Enter JSON attributes",
  // },
  // {
  //   name: "System Description",
  //   key: "system",
  //   type: "text",
  //   placeholder: "Enter system description",
  // },
  // {
  //   name: "Chunk Size",
  //   key: "chunk_size",
  //   type: "number",
  //   placeholder: "Select chunk size",
  // },
  // {
  //   name: "Chunk Overlap",
  //   key: "chunk_overlap",
  //   type: "number",
  //   placeholder: "Select chunk overlap",
  // },
  // {
  //   name: "Sub Chunk Sizes",
  //   key: "sub_chunk_sizes",
  //   type: "list",
  //   placeholder: "Enter sub chunk sizes",
  //   options: [512, 256, 128],
  // },
  // {
  //   name: "With Hierarchy",
  //   key: "with_hierarchy",
  //   type: "boolean",
  //   placeholder: "Enable hierarchy",
  // },
  // {
  //   name: "Top K",
  //   key: "top_k",
  //   type: "number",
  //   placeholder: "Select top K results",
  // },
  // {
  //   name: "Model",
  //   key: "model",
  //   type: "text",
  //   placeholder: "Enter model name",
  // },
  {
    name: "Embed Model",
    key: "embed_model",
    type: "select",
    placeholder: "Enter embed model name",
    options: ["mxbai-embed-large", "nomic-embed-text"],
  },
  {
    name: "Mode",
    key: "mode",
    type: "select",
    placeholder: "Enter mode",
    options: [
      "annoy",
      "fusion",
      "bm25",
      "hierarchy",
      "deeplake",
      "faiss",
      "graph_nx",
    ],
  },
  // {
  //   name: "Store Path",
  //   key: "store_path",
  //   type: "text",
  //   placeholder: "Enter store path",
  // },
  {
    name: "Score Threshold",
    key: "score_threshold",
    type: "number",
    placeholder: "Set score threshold",
    min: 0.0,
    max: 1.0,
    step: 0.1,
  },
  // {
  //   name: "Split Mode",
  //   key: "split_mode",
  //   type: "list",
  //   placeholder: "Select split modes",
  //   options: ["markdown", "hierarchy"],
  // },
  {
    name: "Fusion Mode",
    key: "fusion_mode",
    type: "radio",
    placeholder: "Select fusion mode",
    options: [
      { label: "reciprocal_rerank", value: "reciprocal_rerank" },
      { label: "relative_score", value: "relative_score" },
      { label: "dist_based_score", value: "dist_based_score" },
      { label: "simple", value: "simple" },
    ],
  },
  {
    name: "Days",
    key: "days",
    type: "slider",
    placeholder: "Select number of days to filter",
    min: 0,
    max: 14,
  },
  {
    name: "Disable Chunking",
    key: "disable_chunking",
    type: "boolean",
    placeholder: "Disable chunking",
  },
];

DEFAULT_FILTER_OPTIONS.map((item) => {
  const key = item.key as keyof typeof DEFAULT_FILTERS;
  item.value = DEFAULT_FILTERS[key] ?? undefined;
});
