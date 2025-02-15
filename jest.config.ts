import type { Config } from "jest";

const config: Config = {
  preset: "react-scripts",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1", // Maps "~/" to "src/"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // If you have global test setup
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
