import React from "react";
import ActivityList from "./pages/Dashboard/ActivityList";
import ProfileCard from "./pages/Dashboard/ProfileCard";
import SettingsPanel from "./pages/Dashboard/SettingsPanel";
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
          <ActivityList />
          <JobGraph />
        </AppBody>
      </AppContainer>
    </ThemeProviderWrapper>
  );
};

export default App;
