import React from "react";
import styled from "styled-components";
import {
  Input,
  Button,
  Select,
  Switch,
  Checkbox,
  RadioGroup,
  Slider,
} from "../JobSearch";

interface SidebarProps {
  query: string;
  setQuery: (query: string) => void;
  filters: Record<string, any>;
  handleFilterChange: (key: string, value: any) => void;
  filterOptions: Array<any>;
  onSearch: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  query,
  setQuery,
  filters,
  handleFilterChange,
  filterOptions,
  onSearch,
}) => {
  return (
    <SidebarContainer>
      <SearchSection>
        <Input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={onSearch}>Search</Button>
      </SearchSection>

      <FiltersSection>
        {filterOptions.map((filter) => (
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
            ) : filter.type === "slider" ? (
              <Slider
                min={filter.min}
                max={filter.max}
                defaultValue={filter.default}
                value={filters[filter.key]}
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
      </FiltersSection>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 300px;
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;
`;

const FiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;
