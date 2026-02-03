import { useEffect, useState } from "react";
import type { Product } from "../utils/types.d.ts";
import { getProductsFiltered } from "../api/product.js";
import { useFilters } from "./useFilters.tsx";

const API = import.meta.env.VITE_API;

const RESULT_PER_PAGE = 10;

export const useUrl = () => {
  const { filters, setSearchParams, searchParams } = useFilters();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1),
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // const [filters, setFilters] = useState<FiltersType>({
  //   category: searchParams.get("category") || "",
  //   title: searchParams.get("title") || "",
  // });

  useEffect(() => {
    async function fetchData() {
      try {
        let baseUrl = `${API}/products`;
        setLoading(true);

        const params = new URLSearchParams();

        //append -> adds a new key-value pair to the existing URLSearchParams
        if (filters.category) {
          params.set("category", filters.category);
        }

        if (filters.title) {
          params.set("title", filters.title);
        }

        setSearchParams(params);

        if (params.size !== 0) {
          baseUrl += `?${params.toString()}`;
        }

        const response = await getProductsFiltered(baseUrl);
        const { data } = response;
        console.log(data);

        setFilteredProducts(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters.category, filters.title]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const totalPages = Math.ceil(filteredProducts.length / RESULT_PER_PAGE);
  const start = (currentPage - 1) * RESULT_PER_PAGE;
  const end = start + RESULT_PER_PAGE;
  const totalResult = filteredProducts.slice(start, end);

  return {
    handleChangePage,
    totalPages,
    loading,
    totalResult,
    currentPage,
  };
};
