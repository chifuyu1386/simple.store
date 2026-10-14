import { useEffect, useState } from "react";
import { getProductById } from "../services/productService.";
import type { Product } from "../types/product";

export function useProduct(id: string | number | undefined) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) return;

    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const product = await getProductById(id!);
        if (!ignore) setData(product);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "محصول پیدا نشد");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { data, loading, error };
}