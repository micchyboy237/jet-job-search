import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  vectorNodesAtom,
  fetchVectorNodesAtom,
  filtersAtom,
  uiFiltersAtom,
  uiFiltersHandlerAtom,
} from "../JobGraph/state";
import { DEFAULT_FILTER_OPTIONS, DEFAULT_FILTERS } from "../JobGraph/constants";
import { Filter, QueryOptions, UIOptions } from "../JobGraph/types";
import styled from "styled-components";
import { isEqual } from "../../../utils/comparison";

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

const FilterContainer = styled.form`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 1rem; // Add margin to separate from content below
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  width: 100%; // Ensure full-width search bar
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    flex: 1;
    cursor: pointer;
  }
  span {
    min-width: 30px;
    text-align: center;
    font-weight: bold;
  }
`;

const Slider = ({ min = 0, max = 100, value, defaultValue = 0, onChange }) => {
  return (
    <SliderContainer>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{value}</span>
    </SliderContainer>
  );
};

interface SearchProps {
  onSubmit?: (query: string, filters: QueryOptions) => void;
}

type SearchOptions = QueryOptions & UIOptions;

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [, fetchVectorNodes] = useAtom(fetchVectorNodesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [uiFilters, setUIFilters] = useAtom(uiFiltersHandlerAtom);
  const [query, setQuery] = useState("");

  // const prevFiltersRef = useRef<SearchOptions | null>(null);

  const handleFilterChange = (key: string, value: any) => {
    const option = DEFAULT_FILTER_OPTIONS.find((item) => key === item.key);

    if (option.type === "number") {
      value = !value ? 0 : Number(value);
    }

    if (Object.keys(uiFilters).includes(key)) {
      setUIFilters({ ...uiFilters, [key]: value });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!query) {
      return;
    }

    // const newFilters = {
    //   ...filters,
    //   query,
    // };

    // if (!isEqual(prevFiltersRef.current, newFilters)) {
    fetchVectorNodes(query);
    // prevFiltersRef.current = newFilters;
    // }

    if (onSubmit) {
      onSubmit(query, filters);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filter_options = useMemo(() => {
    return DEFAULT_FILTER_OPTIONS.map((option) => {
      let value;
      if (Object.keys(uiFilters).includes(option.key)) {
        value = uiFilters[option.key];
      } else {
        value = filters[option.key];
      }

      if (option.type === "number") {
        value = String(value || 0);
      }

      return {
        ...option,
        value,
      };
    });
  }, [filters, uiFilters]);

  return (
    <FilterContainer onSubmit={handleSearch}>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onEnter={handleSearch}
        />
        <Button type="submit">Search</Button>
      </SearchBar>
      <Filters>
        {filter_options.map((filter) => (
          <FilterItem key={filter.key}>
            <label>{filter.name}</label>
            {filter.type === "radio" ? (
              <RadioGroup
                options={filter.options}
                value={filter.value || ""}
                onChange={(value) => handleFilterChange(filter.key, value)}
              />
            ) : filter.type === "text" || filter.type === "number" ? (
              <Input
                type={filter.type}
                placeholder={filter.placeholder}
                value={filter.value || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              />
            ) : filter.type === "select" ? (
              <Select
                options={filter.options}
                value={filter.value || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              />
            ) : filter.type === "boolean" ? (
              <Switch
                checked={filter.value || false}
                onChange={(value) => handleFilterChange(filter.key, value)}
              />
            ) : filter.type === "slider" ? (
              <Slider
                min={filter.min}
                max={filter.max}
                defaultValue={filter.default}
                value={filter.value}
                onChange={(value) => handleFilterChange(filter.key, value)}
              />
            ) : filter.type === "list" ? (
              filter.options.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  checked={filter.value?.includes(option) || false}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...(filter.value || []), option]
                      : filter.value?.filter((v) => v !== option);
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
