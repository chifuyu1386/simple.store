import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory, searchProducts } from "../services/productService.";
import type { ProductsResponse } from "../types/product";

interface UseProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
  query?: string;
  sortBy?: string;
  order?: "asc" | "desc"
}

interface UseProductsReturn {
  data: ProductsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useProducts(params: UseProductsParams = {}) : UseProductsReturn {
  const { limit = 12, skip = 0, category, query, sortBy, order} = params;

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true)
        setError(null)

        let response: ProductsResponse;

        if (query) {
          response = await searchProducts(query, {limit, skip})
        } else if (category) {
          response = await getProductsByCategory(category, {limit, skip})
        } else {
          response = await getProducts({ limit, skip, sortBy, order});
        }

        if (!ignore) setData(response);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "خطای ناشناخته")
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    
    load();

    return () => {
      ignore = true
    }
  }, [limit, skip, category, query, sortBy, order]);

  return { data, loading, error}
}