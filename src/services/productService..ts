import { http } from "./http";
import type { Product, ProductsResponse, Category } from "../types/product";

export function getProducts(
  params: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    order?: "asc" | "desc",
    select?: string,
  } = {}) : Promise<ProductsResponse> {
    const { limit = 12, skip = 0, sortBy, order, select} = params;

    const query = new URLSearchParams();
    query.set("limit", String(limit));
    query.set("skip", String(skip));
    if (sortBy) query.set("sortBy", sortBy);
    if (order) query.set("order", order);
    if (select) query.set("select", select);

    return http<ProductsResponse>(`/products?${query.toString()}`);
  }

export function getProductById(id: number | string) : Promise<Product> {
  return http<Product>(`/products/${id}`)
}

export function searchProducts(
  q: string,
  params: {limit?: number, skip?: number} = {}
) : Promise<ProductsResponse> {
  const { limit = 12, skip = 0} = params;

  return http<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
  );
}

export function getProductsByCategory(
  slug: string,
  params: {limit?: number, skip?:number} = {}
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0 } = params;
  return http<ProductsResponse>(
    `/products/category/${slug}?limit=${limit}&skip=${skip}`
  )
}

export function getCategories(): Promise<Category[]> {
  return http<Category[]>("/products/categories");
}

