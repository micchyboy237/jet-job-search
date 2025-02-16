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

export const JobTableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.tableRowBorder};
  background-color: ${({ theme }) => theme.colors.tableHeadBackground};
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
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal appears above other elements */
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto; /* Scroll only inside the modal */
  z-index: 1001;
`;

export const ModalBody = styled.div`
  margin-top: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 1rem;
`;

export const ModalHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

export const ModalClose = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
`;
