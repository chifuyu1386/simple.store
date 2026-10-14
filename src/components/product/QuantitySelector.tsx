import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="افزودن"
        className="p-2.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>

      <span className="w-12 text-center font-medium tabular-nums">
        {value}
      </span>

      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="کاهش"
        className="p-2.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
}