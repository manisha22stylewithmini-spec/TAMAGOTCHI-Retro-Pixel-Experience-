export default function PixelMascot({ size = 64, className = '' }: { size?: number; className?: string }) {
  const s = size;

  return (
    <svg 
      width={s} 
      height={s} 
      viewBox="0 0 16 16" 
      className={`pixel-render ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Body */}
      <rect x="4" y="4" width="8" height="8" fill="#0b0b0b" />
      {/* Head top */}
      <rect x="5" y="3" width="6" height="1" fill="#0b0b0b" />
      {/* Ears */}
      <rect x="3" y="2" width="2" height="3" fill="#0b0b0b" />
      <rect x="11" y="2" width="2" height="3" fill="#0b0b0b" />
      {/* Inner ears */}
      <rect x="4" y="3" width="1" height="1" fill="#ff3ea5" />
      <rect x="11" y="3" width="1" height="1" fill="#ff3ea5" />
      {/* Eyes */}
      <rect x="6" y="6" width="1" height="2" fill="#ffffff" />
      <rect x="9" y="6" width="1" height="2" fill="#ffffff" />
      {/* Eye pupils */}
      <rect x="6" y="7" width="1" height="1" fill="#63c5ff" />
      <rect x="9" y="7" width="1" height="1" fill="#63c5ff" />
      {/* Mouth */}
      <rect x="7" y="9" width="2" height="1" fill="#ff3ea5" />
      {/* Feet */}
      <rect x="4" y="12" width="3" height="2" fill="#0b0b0b" />
      <rect x="9" y="12" width="3" height="2" fill="#0b0b0b" />
      {/* Arms */}
      <rect x="2" y="7" width="2" height="1" fill="#0b0b0b" />
      <rect x="12" y="7" width="2" height="1" fill="#0b0b0b" />
      {/* Belly */}
      <rect x="6" y="10" width="4" height="2" fill="#333333" />
    </svg>
  );
}
