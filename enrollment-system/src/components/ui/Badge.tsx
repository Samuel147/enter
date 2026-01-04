import { getColorClass } from '@/lib/utils';

interface BadgeProps {
  label: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'orange' | 'purple' | 'teal' | 'indigo' | 'gray';
  size?: 'sm' | 'md';
}

export function Badge({ label, color = 'blue', size = 'sm' }: BadgeProps) {
  const bgClass = getColorClass(color, 'bg');
  const textClass = getColorClass(color, 'text');
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';
  
  return (
    <span className={`${bgClass} ${textClass} ${sizeClass} rounded-full font-medium`}>
      {label}
    </span>
  );
}
