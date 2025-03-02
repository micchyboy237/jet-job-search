import styled from "styled-components";

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

export const SummaryItem = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;
