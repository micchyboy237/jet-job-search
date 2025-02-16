import { atom } from "jotai";
import { JobEntity } from "./types";

// Initial value for the JobEntitiesArray state
const initialJobEntities: JobEntity[] = [
  {
    id: "1314607-onlinejobs.ph",
    text: `Job Title: App Developer (iOS/Android)

Role Overview:

We are seeking a skilled app developer to build our mobile app from scratch, integrating travel booking, relocation services, and community features. You will lead the design, development, and launch of our travel app.

Responsibilities:

- Develop and maintain a scalable mobile app for iOS & Android
- Integrate booking systems, payment gateways, and user profiles
- Ensure seamless user experience & mobile responsiveness
- Work with the team to test & refine the app before launch
- Implement security features to protect user data

Qualifications:

- 3+ years of mobile app development (React Native, Flutter, Swift, or Kotlin)
- Experience with APIs, databases, and cloud-based deployment
- Strong UI/UX skills to create a user-friendly interface
- Previous work on travel, booking, or e-commerce apps (preferred)
- Ability to work independently & meet deadlines`,
    entities: [
      {
        text: "App Developer",
        label: "role",
        score: "0.8984",
      },
    ],
  },
];

// Define the Jotai atom for JobEntitiesArray state
export const jobEntitiesAtom = atom<JobEntity[]>(initialJobEntities);
