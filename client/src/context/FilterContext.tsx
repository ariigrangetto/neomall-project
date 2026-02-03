import { createContext, useState } from "react";
import type { FiltersType } from "../utils/types.d";
import { useSearchParams, type SetURLSearchParams } from "react-router";

interface FilterContextType {
  filters: FiltersType;
  setFilter: React.Dispatch<React.SetStateAction<FiltersType>>;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

interface FilterProvideProps {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: FilterProvideProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilter] = useState<FiltersType>({
    category: searchParams.get("category") || "",
    title: searchParams.get("title") || "",
  });

  return (
    <FilterContext.Provider
      value={{ filters, setFilter, searchParams, setSearchParams }}
    >
      {children}
    </FilterContext.Provider>
  );
};
