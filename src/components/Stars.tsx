import { Star } from 'lucide-react';

export function Stars({ value, size = 28 }: { value: number; size?: number }) {
  const filled = Math.round(value);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i <= filled ? '#f7c948' : '#d9d9d9'}
        />
      ))}
    </div>
  );
}
