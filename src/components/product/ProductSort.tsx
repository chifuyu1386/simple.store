interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "default", label: "پیش‌فرض" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating-desc", label: "محبوب‌ترین" },
  { value: "title-asc", label: "الفبایی" },
];

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
        مرتب‌سازی:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}