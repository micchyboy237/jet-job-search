// Define the Entity and JobEntity types (same as before)
export interface Entity {
  text: string; // The entity text, e.g., "App Developer"
  label: string; // The label of the entity, e.g., "role"
  score: string; // The score of the entity, e.g., "0.8984"
}

export interface JobEntity {
  id: string; // Unique job ID, e.g., "1314607-onlinejobs.ph"
  text: string; // The job description text
  entities: Entity[]; // Array of entities related to the job posting
}
