import type { Category } from "../../types/product";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <aside className="lg:w-56 shrink-0">
      <h2 className="font-semibold text-gray-900 mb-3">دسته‌بندی</h2>

      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onCategoryChange(null)}
            className={[
              "w-full text-right px-3 py-2 rounded-lg text-sm transition-colors",
              selectedCategory === null
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100",
            ].join(" ")}
          >
            همه محصولات
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={() => onCategoryChange(cat.slug)}
              className={[
                "w-full text-right px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                selectedCategory === cat.slug
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100",
              ].join(" ")}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}