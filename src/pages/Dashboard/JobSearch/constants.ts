import { DEFAULT_FILTERS } from "../JobGraph/constants";

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
      { label: "Reciprocal Rerank", value: "reciprocal_rerank" },
      { label: "Relative Score", value: "relative_score" },
      { label: "Dist Based Score", value: "dist_based_score" },
      { label: "Simple", value: "simple" },
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
