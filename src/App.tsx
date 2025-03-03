import React, { useState } from "react";
import SettingsPanel from "./pages/Dashboard/SettingsPanel";
import JobList from "./pages/Dashboard/JobList";
import JobGraph from "./pages/Dashboard/JobGraph";
import JobSearch from "./pages/Dashboard/JobSearch"; // Import Search
import {
  AppBody,
  AppContainer,
  AppHeader,
  PageTitle,
  TabButtons,
} from "./styles";
import GlobalStyle from "./theme/GlobalStyle";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import JobEntities from "./pages/Dashboard/JobEntities";
import JobSummary from "./pages/Dashboard/JobSummary";
import JobCoverLetters from "./pages/Dashboard/JobCoverLetters";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("coverLetters");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ThemeProviderWrapper>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <PageTitle>Dashboard</PageTitle>
          <SettingsPanel />
        </AppHeader>
        <AppBody>
          <JobSearch />
          <TabButtons>
            <button onClick={() => handleTabChange("list")}>Job List</button>
            <button onClick={() => handleTabChange("summary")}>
              Job Summary
            </button>
            <button onClick={() => handleTabChange("graph")}>Job Graph</button>
            <button onClick={() => handleTabChange("entities")}>
              Job Entities
            </button>
            <button onClick={() => handleTabChange("coverLetters")}>
              Cover Letters
            </button>
          </TabButtons>
          {activeTab === "list" && <JobList />}
          {activeTab === "summary" && <JobSummary />}
          {activeTab === "graph" && <JobGraph />}
          {activeTab === "entities" && <JobEntities />}
          {activeTab === "coverLetters" && <JobCoverLetters />}
        </AppBody>
      </AppContainer>
    </ThemeProviderWrapper>
  );
};

export default App;
