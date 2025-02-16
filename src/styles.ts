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
  max-width: 100rem;
  width: 100%;
  display: grid;
  gap: 1.25rem;
  justify-items: center;
  align-items: stretch;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Auto-wrap behavior */
  grid-template-rows: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-weight: 600;
`;
