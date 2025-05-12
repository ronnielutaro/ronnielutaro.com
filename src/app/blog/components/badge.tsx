import { Check } from '@phosphor-icons/react/dist/ssr';

interface BadgeProps {
  className?: string;
}

export function Badge({ className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] sm:text-[11px] font-medium my-1 font-mono bg-green-100 text-green-800 ml-1 ${className}`}
    >
      <Check size={12} weight="bold" />
      READ
    </span>
  );
}
