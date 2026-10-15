interface TechBadgeProps {
  name: string;
  color: string; // کلاس Tailwind
}

export function TechBadge({ name, color }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium border ${color}`}
    >
      {name}
    </span>
  );
}