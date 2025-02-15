import React, { useState } from "react";
import { useAtom } from "jotai";
import { vectorNodesAtom, fetchVectorNodesAtom } from "../JobGraph/state";
import { DEFAULT_FILTER_OPTIONS } from "../JobGraph/constants";
import { Filter } from "../JobGraph/types";
import styled from "styled-components";

export const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <CheckboxContainer>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </CheckboxContainer>
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

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
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

const Search: React.FC = () => {
  const [, fetchVectorNodes] = useAtom(fetchVectorNodesAtom);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [query, setQuery] = useState("");

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchVectorNodes(query);
  };

  return (
    <FilterContainer>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchBar>
      <Filters>
        {DEFAULT_FILTER_OPTIONS.map((filter: Filter) => (
          <FilterItem key={filter.key}>
            <label>{filter.name}</label>
            {filter.type === "text" || filter.type === "number" ? (
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
            ) : filter.type === "checkbox" ? (
              filter.options.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  checked={filters[filter.key]?.includes(option) || false}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...(filters[filter.key] || []), option]
                      : filters[filter.key]?.filter(
                          (v: string) => v !== option
                        );
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
