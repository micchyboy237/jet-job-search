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
  grid-template-columns: 1fr; // Adjust to a single column for full width layout
  grid-template-rows: auto;
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
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
