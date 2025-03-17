import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
`;

export const AppHeader = styled.div`
  display: flex;
  max-width: 80rem;
  width: 100%;
  margin: 1.5rem 0;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const AppBody = styled.div`
  max-width: 120rem;
  width: 100%;
  display: grid;
  gap: 1.25rem;
  justify-items: center;
  align-items: stretch;
  grid-template-columns: 1fr; // Default: Single column layout
  grid-template-rows: auto;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 3fr; // Sidebar first (1 part), Content second (3 parts)
    gap: 1.5rem;
  }
`;

export const Sidebar = styled.aside`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    width: auto;
    max-width: 300px; // Restrict sidebar width
    justify-self: start; // Push sidebar to the left
  }
`;

export const Content = styled.main`
  width: 100%;
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 4px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-weight: 600;
`;
