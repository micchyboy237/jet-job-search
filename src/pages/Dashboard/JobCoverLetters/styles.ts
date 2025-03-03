import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const CoverLetterCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  p {
    margin: 0 0 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textLight};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;
