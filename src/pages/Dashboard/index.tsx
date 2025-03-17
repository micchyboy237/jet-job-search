import React, { useState } from "react";
import JobList from "../Dashboard/JobList";
import JobGraph from "../Dashboard/JobGraph";
import JobSearch from "../Dashboard/JobSearch";
import JobEntities from "../Dashboard/JobEntities";
import JobSummary from "../Dashboard/JobSummary";
import JobCoverLetters from "../Dashboard/JobCoverLetters";
import {
  AppBody,
  AppContainer,
  AppHeader,
  Content,
  PageTitle,
  Sidebar,
  TabButtons,
} from "../../styles";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <AppContainer>
      <AppHeader>
        <PageTitle>Dashboard</PageTitle>
      </AppHeader>
      <AppBody>
        <Sidebar>
          <JobSearch />
        </Sidebar>
        <Content>
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
        </Content>
      </AppBody>
    </AppContainer>
  );
};

export default Dashboard;
