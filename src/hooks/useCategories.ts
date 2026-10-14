import { useEffect, useState } from "react";
import { getCategories } from "../services/productService.";
import type { Category } from "../types/product";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const data = await getCategories();
        if (!ignore) setCategories(data);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "خطا در دریافت دسته‌بندی‌ها");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return { categories, loading, error };
}