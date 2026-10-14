import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number; // 0-based
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  // حداکثر ۵ شماره صفحه نشون می‌دیم
  const getPageNumbers = (): number[] => {
    const maxVisible = 5;
    let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible);
    start = Math.max(0, end - maxVisible);

    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="صفحه‌بندی"
    >
      {/* دکمه قبلی — در RTL، فلش راست */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="صفحه قبلی"
        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {pages[0] > 0 && (
        <>
          <PageButton
            page={0}
            current={currentPage}
            onClick={onPageChange}
          />
          {pages[0] > 1 && <span className="text-gray-400 px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <PageButton
          key={p}
          page={p}
          current={currentPage}
          onClick={onPageChange}
        />
      ))}

      {pages[pages.length - 1] < totalPages - 1 && (
        <>
          {pages[pages.length - 1] < totalPages - 2 && (
            <span className="text-gray-400 px-1">…</span>
          )}
          <PageButton
            page={totalPages - 1}
            current={currentPage}
            onClick={onPageChange}
          />
        </>
      )}

      {/* دکمه بعدی — در RTL، فلش چپ */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        aria-label="صفحه بعدی"
        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </nav>
  );
}

function PageButton({
  page,
  current,
  onClick,
}: {
  page: number;
  current: number;
  onClick: (p: number) => void;
}) {
  const isActive = page === current;

  return (
    <button
      onClick={() => onClick(page)}
      className={[
        "min-w-10 h-10 rounded-lg border text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
      ].join(" ")}
    >
      {page + 1}
    </button>
  );
}