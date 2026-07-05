'use client';

type PetalItem = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

const PETALS: PetalItem[] = [
  { id: 1, left: 6, delay: 0, duration: 9, size: 14 },
  { id: 2, left: 14, delay: 1.2, duration: 10, size: 18 },
  { id: 3, left: 22, delay: 2.4, duration: 8, size: 13 },
  { id: 4, left: 31, delay: 0.8, duration: 11, size: 16 },
  { id: 5, left: 42, delay: 1.7, duration: 9, size: 15 },
  { id: 6, left: 53, delay: 2.9, duration: 12, size: 19 },
  { id: 7, left: 61, delay: 0.4, duration: 10, size: 14 },
  { id: 8, left: 72, delay: 1.9, duration: 9, size: 17 },
  { id: 9, left: 84, delay: 3.1, duration: 11, size: 15 },
  { id: 10, left: 93, delay: 1.1, duration: 10, size: 18 },
];

type PetalLayerProps = {
  active?: boolean;
};

export function PetalLayer({ active = true }: PetalLayerProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {PETALS.map((petal) => (
        <span
          key={petal.id}
          className="petal-shape petal-fall absolute top-[-40px]"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.7}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}
    </div>
  );
}