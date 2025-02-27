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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");

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
            <button onClick={() => handleTabChange("graph")}>Job Graph</button>
            <button onClick={() => handleTabChange("entities")}>
              Job Entities
            </button>
          </TabButtons>
          {activeTab === "list" && <JobList />}
          {activeTab === "graph" && <JobGraph />}
          {activeTab === "entities" && <JobEntities />}
        </AppBody>
      </AppContainer>
    </ThemeProviderWrapper>
  );
};

export default App;
