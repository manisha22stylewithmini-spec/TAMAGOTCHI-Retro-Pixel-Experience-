export function PixelCheckerBorder({ 
  position = 'bottom', 
  color1 = '#0b0b0b', 
  color2 = 'transparent',
  height = 32 
}: { 
  position?: 'top' | 'bottom'; 
  color1?: string; 
  color2?: string;
  height?: number;
}) {
  const blockSize = 16;
  const cols = 140; // enough for wide screens
  const rows = Math.ceil(height / blockSize);

  return (
    <div 
      className={`absolute left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'} z-10 overflow-hidden`}
      style={{ height: `${height}px` }}
    >
      <svg width="100%" height={height} preserveAspectRatio="none" viewBox={`0 0 ${cols * blockSize} ${height}`} className="block w-full">
        {Array.from({ length: cols }, (_, i) =>
          Array.from({ length: rows }, (_, j) => {
            const isColored = (i + j) % 2 === 0;
            return (
              <rect
                key={`${i}-${j}`}
                x={i * blockSize}
                y={j * blockSize}
                width={blockSize}
                height={blockSize}
                fill={isColored ? color1 : color2}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

export function PixelStepBorder({
  position = 'bottom',
  color = '#0b0b0b',
}: {
  position?: 'top' | 'bottom';
  color?: string;
  bgColor?: string;
}) {
  const blockSize = 16;
  const cols = 140;
  const steps = 3;

  return (
    <div
      className={`absolute left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'} z-10 pointer-events-none`}
      style={{ height: `${blockSize * steps}px` }}
    >
      <svg
        width="100%"
        height={blockSize * steps}
        preserveAspectRatio="none"
        viewBox={`0 0 ${cols * blockSize} ${blockSize * steps}`}
        className="block w-full"
      >
        {Array.from({ length: cols }, (_, i) =>
          Array.from({ length: steps }, (_, j) => {
            const row = position === 'bottom' ? j : steps - 1 - j;
            // Create stepped pattern: more blocks as we go to the edge
            const shouldRender = position === 'bottom'
              ? (i % (steps - j)) === 0
              : (i % (j + 1)) === 0;
            if (!shouldRender) return null;
            return (
              <rect
                key={`${i}-${j}`}
                x={i * blockSize}
                y={row * blockSize}
                width={blockSize}
                height={blockSize}
                fill={color}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
