// Example of usage in a component (React)
import { useAtom } from "jotai";
import React from "react";
import { JobEntity } from "./types";
import { jobEntitiesAtom } from "./state";

const JobEntities: React.FC = () => {
  const [jobEntities, setJobEntities] = useAtom(jobEntitiesAtom);

  // Function to add a new job posting
  const addJobPosting = () => {
    const newJob: JobEntity = {
      id: "1314608-onlinejobs.ph",
      text: `Job Title: Backend Developer (Node.js)

Role Overview:

We are looking for a Backend Developer to work on building scalable, high-performance server-side applications for our platform. You will work with a team of engineers to create cutting-edge, backend solutions.

Responsibilities:

- Develop backend services using Node.js
- Integrate APIs and databases
- Optimize server-side performance
- Write and maintain technical documentation

Qualifications:

- Strong experience with Node.js, Express, and MongoDB
- Knowledge of REST APIs and microservices architecture
- Familiarity with cloud-based services (AWS, GCP, etc.)
- Excellent problem-solving and debugging skills`,
      entities: [
        {
          text: "Backend Developer",
          label: "role",
          score: "0.9052",
        },
      ],
    };

    // Update state with the new job posting
    setJobEntities([...jobEntities, newJob]);
  };

  return (
    <div>
      <h1>Job Postings</h1>
      <ul>
        {jobEntities.map((job) => (
          <li key={job.id}>
            <h2>{job.id}</h2>
            <p>{job.text}</p>
            <h3>Entities:</h3>
            <ul>
              {job.entities.map((entity, index) => (
                <li key={index}>
                  {entity.label}: {entity.text} (score: {entity.score})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={addJobPosting}>Add New Job Posting</button>
    </div>
  );
};

export default JobEntities;
