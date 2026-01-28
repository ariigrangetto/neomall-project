import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { FiltersType, Product } from "../utils/types.d.ts";
import { getProductsFiltered } from "../api/product.js";

const RESULT_PER_PAGE = 10;

export const useUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FiltersType>({
    category: searchParams.get("category") || "",
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let baseUrl = `http://localhost:8080/products`;

        const params = new URLSearchParams();

        if (filters.category) {
          params.append("category", filters.category);
        }

        if (inputValue) {
          params.append("title", inputValue);
        }

        if (params.size !== 0) {
          baseUrl += `?${params.toString()}`;
        }

        const response = await getProductsFiltered(baseUrl);

        setFilteredProducts(response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters.category, inputValue]);

  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams();

      if (filters.category) params.set("category", filters.category);

      if (inputValue) params.set("title", inputValue);

      return params;
    });
  }, [filters.category, inputValue]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / RESULT_PER_PAGE);
  const start = (currentPage - 1) * RESULT_PER_PAGE;
  const end = start + RESULT_PER_PAGE;
  const totalResult = filteredProducts.slice(start, end);

  const handleUpdateInputSearch = (text: string) => {
    setInputValue(text);
  };

  return {
    handleChangePage,
    totalPages,
    loading,
    handleUpdateInputSearch,
    totalResult,
    setFilters,
    currentPage,
  };
};
