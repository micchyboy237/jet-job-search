import React from "react";
import ProfileCard from "./pages/Dashboard/ProfileCard";
import SettingsPanel from "./pages/Dashboard/SettingsPanel";
import JobList from "./pages/Dashboard/JobList";
import JobGraph from "./pages/Dashboard/JobGraph";
import { AppBody, AppContainer, AppHeader, PageTitle } from "./styles";
import GlobalStyle from "./theme/GlobalStyle";
import { ThemeProviderWrapper } from "./theme/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <PageTitle>Dashboard</PageTitle>
          <SettingsPanel />
        </AppHeader>
        <AppBody>
          <ProfileCard />
          <JobList />
          <JobGraph />
        </AppBody>
      </AppContainer>
    </ThemeProviderWrapper>
  );
};

export default App;
