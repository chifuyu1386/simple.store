interface RatingProps {
  value: number; // از 0 تا 5
  showValue?: boolean;
  size?: "sm" | "md";
}

export function Rating({ value, showValue = false, size = "md" }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;

  const sizeClass = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`inline-flex items-center gap-1 ${sizeClass}`}>
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) return <Star key={i} filled />;
          if (i === fullStars && hasHalfStar)
            return <Star key={i} half />;
          return <Star key={i} />;
        })}
      </div>
      {showValue && (
        <span className="text-gray-600 text-xs">({value.toFixed(1)})</span>
      )}
    </div>
  );
}

function Star({ filled, half }: { filled?: boolean; half?: boolean }) {
  if (half) {
    return (
      <span className="relative inline-block">
        <StarSvg className="text-gray-300" />
        <span className="absolute inset-0 overflow-hidden w-1/2">
          <StarSvg className="text-yellow-500" />
        </span>
      </span>
    );
  }
  return <StarSvg className={filled ? "text-yellow-500" : "text-gray-300"} />;
}

function StarSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 ${className}`}
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
    </svg>
  );
}