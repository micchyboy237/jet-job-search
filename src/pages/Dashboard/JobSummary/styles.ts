import styled from "styled-components";

export const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

export const SummaryItem = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;
