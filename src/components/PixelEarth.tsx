export default function PixelEarth({ size = 200, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`pixel-render ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Ocean background circle */}
      <rect x="10" y="2" width="12" height="2" fill="#63c5ff" />
      <rect x="7" y="4" width="18" height="2" fill="#63c5ff" />
      <rect x="5" y="6" width="22" height="2" fill="#63c5ff" />
      <rect x="4" y="8" width="24" height="2" fill="#63c5ff" />
      <rect x="3" y="10" width="26" height="2" fill="#63c5ff" />
      <rect x="2" y="12" width="28" height="2" fill="#63c5ff" />
      <rect x="2" y="14" width="28" height="2" fill="#63c5ff" />
      <rect x="2" y="16" width="28" height="2" fill="#63c5ff" />
      <rect x="3" y="18" width="26" height="2" fill="#63c5ff" />
      <rect x="4" y="20" width="24" height="2" fill="#63c5ff" />
      <rect x="5" y="22" width="22" height="2" fill="#63c5ff" />
      <rect x="7" y="24" width="18" height="2" fill="#63c5ff" />
      <rect x="10" y="26" width="12" height="2" fill="#63c5ff" />
      <rect x="12" y="28" width="8" height="2" fill="#63c5ff" />

      {/* Land masses - green */}
      {/* North America-ish */}
      <rect x="8" y="6" width="4" height="2" fill="#5dd84f" />
      <rect x="7" y="8" width="6" height="2" fill="#5dd84f" />
      <rect x="8" y="10" width="5" height="2" fill="#5dd84f" />
      <rect x="9" y="12" width="3" height="2" fill="#5dd84f" />

      {/* Europe-Africa-ish */}
      <rect x="18" y="8" width="4" height="2" fill="#5dd84f" />
      <rect x="17" y="10" width="6" height="2" fill="#5dd84f" />
      <rect x="18" y="12" width="5" height="2" fill="#5dd84f" />
      <rect x="19" y="14" width="4" height="2" fill="#5dd84f" />
      <rect x="18" y="16" width="5" height="2" fill="#5dd84f" />
      <rect x="19" y="18" width="3" height="2" fill="#5dd84f" />

      {/* South America-ish */}
      <rect x="11" y="16" width="3" height="2" fill="#5dd84f" />
      <rect x="10" y="18" width="4" height="2" fill="#5dd84f" />
      <rect x="11" y="20" width="3" height="2" fill="#5dd84f" />
      <rect x="12" y="22" width="2" height="2" fill="#5dd84f" />

      {/* Darker green details */}
      <rect x="8" y="8" width="2" height="2" fill="#3daa2f" />
      <rect x="18" y="10" width="2" height="2" fill="#3daa2f" />
      <rect x="19" y="16" width="2" height="2" fill="#3daa2f" />
      <rect x="11" y="18" width="2" height="2" fill="#3daa2f" />

      {/* Highlight */}
      <rect x="10" y="4" width="4" height="2" fill="#b0e8ff" opacity="0.5" />
      <rect x="8" y="6" width="2" height="2" fill="#b0e8ff" opacity="0.3" />
    </svg>
  );
}
