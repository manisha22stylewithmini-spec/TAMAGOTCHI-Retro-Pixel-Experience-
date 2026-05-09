import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  startX: number;
  variant: number;
}

export default function PixelCloud() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const generated: Cloud[] = [
      { id: 0, y: 12, speed: 45, size: 160, opacity: 0.95, startX: 10, variant: 0 },
      { id: 1, y: 28, speed: 35, size: 120, opacity: 0.9, startX: 50, variant: 1 },
      { id: 2, y: 8, speed: 55, size: 140, opacity: 0.85, startX: 70, variant: 2 },
      { id: 3, y: 40, speed: 40, size: 100, opacity: 0.8, startX: 25, variant: 0 },
      { id: 4, y: 20, speed: 50, size: 180, opacity: 0.9, startX: 80, variant: 1 },
      { id: 5, y: 50, speed: 38, size: 90, opacity: 0.7, startX: 40, variant: 2 },
      { id: 6, y: 35, speed: 42, size: 130, opacity: 0.85, startX: 5, variant: 0 },
    ];
    setClouds(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute pixel-render"
          style={{
            top: `${cloud.y}%`,
            left: `${cloud.startX}%`,
            width: `${cloud.size}px`,
            opacity: cloud.opacity,
            animation: `cloudDrift ${cloud.speed}s linear infinite`,
            animationDelay: `-${cloud.speed * (cloud.startX / 100)}s`,
          }}
        >
          <CloudSVG size={cloud.size} variant={cloud.variant} />
        </div>
      ))}
    </div>
  );
}

function CloudSVG({ size, variant = 0 }: { size: number; variant?: number }) {
  const w = size;
  const h = Math.round(size * 0.45);
  const b = Math.max(Math.round(size / 14), 4);

  if (variant === 0) {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${14 * b} ${6 * b}`} className="pixel-render">
        <rect x={b * 4} y={0} width={b * 4} height={b} fill="white" />
        <rect x={b * 2} y={b} width={b * 8} height={b} fill="white" />
        <rect x={b} y={b * 2} width={b * 10} height={b} fill="white" />
        <rect x={0} y={b * 3} width={b * 14} height={b} fill="white" />
        <rect x={0} y={b * 4} width={b * 12} height={b} fill="white" />
        <rect x={b} y={b * 5} width={b * 8} height={b} fill="rgba(255,255,255,0.8)" />
      </svg>
    );
  }
  
  if (variant === 1) {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${12 * b} ${5 * b}`} className="pixel-render">
        <rect x={b * 3} y={0} width={b * 5} height={b} fill="white" />
        <rect x={b * 2} y={b} width={b * 8} height={b} fill="white" />
        <rect x={0} y={b * 2} width={b * 12} height={b} fill="white" />
        <rect x={b} y={b * 3} width={b * 10} height={b} fill="white" />
        <rect x={b * 2} y={b * 4} width={b * 6} height={b} fill="rgba(255,255,255,0.7)" />
      </svg>
    );
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${10 * b} ${5 * b}`} className="pixel-render">
      <rect x={b * 2} y={0} width={b * 3} height={b} fill="white" />
      <rect x={b} y={b} width={b * 7} height={b} fill="white" />
      <rect x={0} y={b * 2} width={b * 10} height={b} fill="white" />
      <rect x={0} y={b * 3} width={b * 8} height={b} fill="white" />
      <rect x={b} y={b * 4} width={b * 5} height={b} fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}
