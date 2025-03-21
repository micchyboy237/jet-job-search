// src/pages/Dashboard/Jobs/styles.ts
import styled from "styled-components";

export const JobTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const JobTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const JobTableHeader = styled.th<{ isSorted: boolean }>`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.tableRowBorder};
  background-color: ${({ theme }) => theme.colors.tableHeadBackground};
  cursor: pointer;
  ${({ isSorted }) =>
    isSorted &&
    `
      background-color: ${({ theme }) => theme.colors.tableSortedHeader};
      font-weight: bold;
    `}
`;

export const JobTableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.tableRowHighlight};
  }
`;

export const JobTableData = styled.td`
  padding: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tableRowBorder};
  max-width: 200px; /* Truncate long text */
`;

export const Score = styled.span`
  font-weight: bold;
  &.high {
    color: green;
  }
  &.medium {
    color: orange;
  }
  &.low {
    color: red;
  }
`;

// Pagination styles
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

// Modal Styles

export const ModalContent = styled.div``;

export const ModalBody = styled.div`
  padding-right: 1rem;
  line-height: 1.5;
  font-size: 1rem;

  p {
    margin-bottom: 0.8rem;
  }

  strong {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ModalHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalClose = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Container = styled.div`
  strong {
    display: block;
  }
  p {
    white-space: pre-wrap;
  }
`;
