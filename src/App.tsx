import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error } = useProducts({
    limit: 5,
    skip: page * 5,
    query: debouncedSearch || undefined,
  });

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">تست هوک‌ها</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجوی محصول..."
        className="border p-2 rounded w-full"
      />

      {loading && <p>⏳ در حال بارگذاری...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {data && (
        <>
          <p className="text-sm text-gray-500">
            مجموع نتایج: {data.total}
          </p>
          <ul className="space-y-1">
            {data.products.map((p) => (
              <li key={p.id}>
                {p.title} — ${p.price}
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              قبلی
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data && (page + 1) * 5 >= data.total}
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              بعدی
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;