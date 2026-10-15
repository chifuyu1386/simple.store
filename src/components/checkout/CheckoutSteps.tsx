import { Check } from "lucide-react";
import type { CheckoutStep } from "../../types/checkout";

const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "shipping", label: "آدرس" },
  { key: "payment", label: "پرداخت" },
  { key: "review", label: "تایید" },
];

interface CheckoutStepsProps {
  current: CheckoutStep;
}

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500",
                ].join(" ")}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={[
                  "text-sm font-medium hidden sm:block",
                  isActive ? "text-blue-600" : "text-gray-500",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={[
                  "w-8 sm:w-12 h-0.5 rounded",
                  index < currentIndex ? "bg-green-500" : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}