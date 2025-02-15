import React, { useState } from "react";
import { useAtom } from "jotai";
import { vectorNodesAtom, fetchVectorNodesAtom } from "../JobGraph/state";
import { DEFAULT_FILTER_OPTIONS, DEFAULT_FILTERS } from "../JobGraph/constants";
import { Filter } from "../JobGraph/types";
import styled from "styled-components";

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onEnter,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export const Select = ({ options, value, onChange }) => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
};

export const Switch = ({ checked, onChange }) => {
  return (
    <SwitchContainer onClick={() => onChange(!checked)} checked={checked}>
      <SwitchSlider checked={checked} />
    </SwitchContainer>
  );
};

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <CheckboxContainer>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </CheckboxContainer>
  );
};

export const RadioGroup = ({ options, value, onChange }) => {
  return (
    <RadioContainer>
      {options.map((option) => (
        <RadioLabel key={option.value}>
          <input
            type="radio"
            name="radioGroup"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </RadioLabel>
      ))}
    </RadioContainer>
  );
};

export const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const SwitchContainer = styled.div`
  width: 40px;
  height: 20px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary : theme.colors.border};
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: background 0.3s;
`;

const SwitchSlider = styled.div`
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transform: ${({ checked }) =>
    checked ? "translateX(20px)" : "translateX(0)"};
  transition: transform 0.3s;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Search = () => {
  const [, fetchVectorNodes] = useAtom(fetchVectorNodesAtom);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [query, setQuery] = useState("");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchVectorNodes(query, filters);
  };

  return (
    <FilterContainer>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onEnter={handleSearch}
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchBar>
      <Filters>
        {DEFAULT_FILTER_OPTIONS.map((filter) => (
          <FilterItem key={filter.key}>
            <label>{filter.name}</label>
            {filter.type === "radio" ? (
              <RadioGroup
                options={filter.options}
                value={filters[filter.key] || ""}
                onChange={(value) => handleFilterChange(filter.key, value)}
              />
            ) : filter.type === "text" || filter.type === "number" ? (
              <Input
                type={filter.type}
                placeholder={filter.placeholder}
                value={filters[filter.key] || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              />
            ) : filter.type === "select" ? (
              <Select
                options={filter.options}
                value={filters[filter.key] || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              />
            ) : filter.type === "boolean" ? (
              <Switch
                checked={filters[filter.key] || false}
                onChange={(value) => handleFilterChange(filter.key, value)}
              />
            ) : filter.type === "list" ? (
              filter.options.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  checked={filters[filter.key]?.includes(option) || false}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...(filters[filter.key] || []), option]
                      : filters[filter.key]?.filter((v) => v !== option);
                    handleFilterChange(filter.key, newValues);
                  }}
                />
              ))
            ) : null}
          </FilterItem>
        ))}
      </Filters>
    </FilterContainer>
  );
};

export default Search;
