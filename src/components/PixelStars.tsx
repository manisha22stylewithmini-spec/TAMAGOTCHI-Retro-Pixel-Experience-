import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  type: 'dot' | 'cross' | 'diamond';
}

export default function PixelStars({ count = 15 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const types: Star['type'][] = ['dot', 'cross', 'diamond'];
    const generated: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 95 + 2,
      y: Math.random() * 90 + 5,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setStars(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${1.5 + star.delay * 0.3}s`,
          }}
        >
          {star.type === 'dot' && (
            <div
              className="bg-white"
              style={{ width: star.size, height: star.size }}
            />
          )}
          {star.type === 'cross' && (
            <svg width={star.size} height={star.size} viewBox="0 0 8 8">
              <rect x="3" y="0" width="2" height="8" fill="white" />
              <rect x="0" y="3" width="8" height="2" fill="white" />
            </svg>
          )}
          {star.type === 'diamond' && (
            <svg width={star.size} height={star.size} viewBox="0 0 8 8">
              <rect x="3" y="0" width="2" height="2" fill="white" />
              <rect x="1" y="2" width="6" height="2" fill="white" />
              <rect x="0" y="3" width="8" height="2" fill="white" />
              <rect x="1" y="5" width="6" height="1" fill="white" />
              <rect x="3" y="6" width="2" height="2" fill="white" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
