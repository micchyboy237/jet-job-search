import { Filter, QueryOptions, UIOptions } from "./types";

export const MY_SKILLS_KEYWORDS = [
  "React.js",
  "React Native",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "AWS",
];

export const DEFAULT_FILTERS: QueryOptions = {
  rag_dir:
    "/Users/jethroestrada/Desktop/External_Projects/Jet_Projects/my-jobs/saved/jobs.json",
  extensions: [".md", ".mdx", ".rst"],
  json_attributes: [
    "title",
    // "keywords",
    // "entities.role",
    // "entities.application",
    // "entities.coding_libraries",
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
    "entities.coding_libraries",
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
