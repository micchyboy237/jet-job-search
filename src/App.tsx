import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import GlobalStyle from "./theme/GlobalStyle";
import { ThemeProviderWrapper } from "./theme/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/files" element={<Files />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
};

export default App;
