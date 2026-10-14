import type { ReactNode } from "react";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400">
        <PackageOpen className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}