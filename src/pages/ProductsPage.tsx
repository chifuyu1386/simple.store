import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useDebounce } from "../hooks/useDebounce";
import { ProductGrid } from "../components/product/ProductGrid";
import { ProductSort } from "../components/product/ProductSort";
import { ProductFilters } from "../components/product/ProductFilters";
import { Button, EmptyState, FullPageSpinner, Input, Pagination } from "../components/ui";
import { useState } from "react";

const PAGE_SIZE = 12;

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // خواندن از URL
  const page = Number(searchParams.get("page") || "1") - 1; // URL یک‌بایسه، داخلی صفر
  const category = searchParams.get("category") || undefined;
  const sort = searchParams.get("sort") || "default";
  const query = searchParams.get("q") || "";

  // input جستجو state محلی داره ولی با debounce به URL می‌ره
  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearch = useDebounce(searchInput, 500);

  // اگه debouncedSearch عوض شد و با query توی URL فرق داشت، آپدیتش کن
  if (debouncedSearch !== query && debouncedSearch !== searchInput) {
    // این کار توی رندر نمی‌شه کرد، برای همین از useEffect استفاده می‌کنیم
  }

  // parse sort
  const [sortBy, order] = sort.includes("-")
    ? sort.split("-")
    : [undefined, undefined];

  const { data, loading, error } = useProducts({
    limit: PAGE_SIZE,
    skip: page * PAGE_SIZE,
    category,
    query: query || undefined,
    sortBy,
    order: order as "asc" | "desc" | undefined,
  });

  const { categories } = useCategories();

  // ─── آپدیت URL ───
  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    // هر تغییر فیلتر، صفحه رو ریست کن
    if (!("page" in updates)) next.delete("page");
    setSearchParams(next);
  };

  const handleCategoryChange = (slug: string | null) => {
    updateParams({ category: slug });
    setMobileFiltersOpen(false);
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value === "default" ? null : value });
  };

  const handleSearchSubmit = (value: string) => {
    updateParams({ q: value || null });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage + 1) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(category || query || sort !== "default");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* سرصفحه */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">محصولات</h1>
        {data && (
          <p className="text-sm text-gray-500 mt-1">
            {data.total.toLocaleString("fa-IR")} محصول یافت شد
          </p>
        )}
      </div>

      {/* نوار ابزار */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(searchInput);
            }}
          >
            <Input
              name="search"
              placeholder="جستجوی محصول..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleSearchSubmit(e.target.value);
              }}
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
          >
            <SlidersHorizontal className="h-4 w-4" />
            فیلترها
          </button>

          <ProductSort value={sort} onChange={handleSortChange} />
        </div>
      </div>

      {/* فیلترهای فعال */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-gray-600">فیلترهای فعال:</span>
          {category && (
            <FilterChip
              label={category}
              onRemove={() => handleCategoryChange(null)}
            />
          )}
          {query && (
            <FilterChip
              label={`جستجو: ${query}`}
              onRemove={() => {
                setSearchInput("");
                handleSearchSubmit("");
              }}
            />
          )}
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:underline mr-2"
          >
            پاک کردن همه
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* فیلترهای دسکتاپ */}
        <div className="hidden lg:block">
          <ProductFilters
            categories={categories}
            selectedCategory={category || null}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 min-w-0">
          {loading && <FullPageSpinner />}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                تلاش مجدد
              </Button>
            </div>
          )}

          {!loading && !error && data && data.products.length === 0 && (
            <EmptyState
              title="محصولی پیدا نشد"
              description="فیلترها رو تغییر بده یا یه کلمه دیگه جستجو کن."
              action={
                <Button variant="outline" onClick={handleClearFilters}>
                  پاک کردن فیلترها
                </Button>
              }
            />
          )}

          {!loading && !error && data && data.products.length > 0 && (
            <>
              <ProductGrid products={data.products} />
              <Pagination
                currentPage={page}
                totalItems={data.total}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* فیلترهای موبایل */}
      {mobileFiltersOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="absolute inset-y-0 right-0 w-72 bg-white p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">فیلترها</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
                aria-label="بستن"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductFilters
              categories={categories}
              selectedCategory={category || null}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── چیپ فیلتر ───
function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-blue-100 rounded-full p-0.5"
        aria-label="حذف فیلتر"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}