import React, { useState } from "react";
import styled from "styled-components";

interface ToggleButtonProps {
  options: string[];
  onChange: (selected: string) => void;
  defaultValue?: string;
}

const ToggleWrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
`;

const ToggleOption = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primaryDark : theme.colors.backgroundSecondary};
  }
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <ToggleWrapper>
      {options.map((option) => (
        <ToggleOption
          key={option}
          active={option === selected}
          onClick={() => handleClick(option)}
        >
          {option}
        </ToggleOption>
      ))}
    </ToggleWrapper>
  );
};

export default ToggleButton;
