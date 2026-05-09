import { type ReactNode } from 'react';

interface RetroTVProps {
  children: ReactNode;
  className?: string;
}

export default function RetroTV({ children, className = '' }: RetroTVProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main TV container — responsive, keeps aspect ratio ~1.1:1 */}
      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: '620px',
          aspectRatio: '1.1 / 1',
        }}
      >

        {/* ── TV Body ── */}
        {/* Outer TV shell - teal body */}
        <div
          className="absolute inset-0 rounded-[12px] sm:rounded-[16px] md:rounded-[20px]"
          style={{
            background: 'linear-gradient(180deg, #5cc8c8 0%, #4ab5b5 40%, #3da0a0 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.2)',
          }}
        />

        {/* Inner dark bezel */}
        <div
          className="absolute rounded-[8px] sm:rounded-[10px] md:rounded-[14px]"
          style={{
            left: '5%',
            top: '5%',
            right: '5%',
            bottom: '8%',
            background: 'linear-gradient(180deg, #2a2a2e 0%, #1a1a1e 100%)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
          }}
        />

        {/* ── Screen opening ── */}
        <div
          className="absolute overflow-hidden z-10 flex items-center justify-center"
          style={{
            left: '9%',
            top: '10%',
            width: '57%',
            height: '65%',
            borderRadius: '8px',
            background: '#0a0a0a',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.9)',
          }}
        >
          {/* CRT vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), inset 0 0 12px rgba(0,0,0,0.7)',
              borderRadius: '8px',
            }}
          />
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-[0.07]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
            }}
          />
          {/* CRT curvature */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.2) 100%)',
              borderRadius: '8px',
            }}
          />
          {/* CRT tint */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
            style={{
              background: 'linear-gradient(180deg, rgba(99,197,255,0.15) 0%, transparent 50%, rgba(99,197,255,0.1) 100%)',
            }}
          />

          {/* Game content */}
          <div className="relative w-full h-full z-10">
            {children}
          </div>
        </div>

        {/* ── Knobs on right side ── */}
        {/* Large channel knob */}
        <div
          className="absolute z-20"
          style={{ right: '10%', top: '20%', width: '16%', height: '0', paddingBottom: '16%' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #555 0%, #222 50%, #444 100%)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)',
            }}
          />
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[3px] h-[30%] bg-white/30 rounded-full" />
          <div className="absolute inset-[-4px] rounded-full border-2 border-white/10" />
        </div>

        {/* Small knob */}
        <div
          className="absolute z-20"
          style={{ right: '12%', top: '48%', width: '12%', height: '0', paddingBottom: '12%' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #666 0%, #333 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* ── Speaker grille ── */}
        <div
          className="absolute z-20"
          style={{ right: '8%', bottom: '12%', width: '20%', height: '15%' }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="w-full rounded-full mb-[3px]"
              style={{
                height: '3px',
                background: 'rgba(0,0,0,0.4)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.05)',
              }}
            />
          ))}
        </div>

        {/* ── Antenna ── */}
        <div
          className="absolute z-30"
          style={{
            left: '22%',
            top: '-14%',
            width: '2px',
            height: '18%',
            background: 'linear-gradient(180deg, #ccc, #888)',
            transformOrigin: 'bottom center',
            transform: 'rotate(-15deg)',
            borderRadius: '1px',
          }}
        />
        <div
          className="absolute z-30 w-[6px] h-[6px] rounded-full"
          style={{
            left: 'calc(22% - 3px)',
            top: '-15%',
            background: 'linear-gradient(145deg, #eee, #aaa)',
            transform: 'translateX(-2px)',
          }}
        />

        {/* ── Power LED ── */}
        <div
          className="absolute z-20 w-[6px] h-[6px] rounded-full animate-pulse"
          style={{
            right: '14%',
            bottom: '30%',
            background: '#5dd84f',
            boxShadow: '0 0 6px #5dd84f, 0 0 12px rgba(93,216,79,0.3)',
          }}
        />

        {/* ── Bottom feet ── */}
        <div className="absolute z-20" style={{ left: '15%', bottom: '-2%', width: '8%', height: '4%' }}>
          <div className="w-full h-full rounded-b-md" style={{ background: 'linear-gradient(180deg, #3da0a0, #2d8888)' }} />
        </div>
        <div className="absolute z-20" style={{ right: '15%', bottom: '-2%', width: '8%', height: '4%' }}>
          <div className="w-full h-full rounded-b-md" style={{ background: 'linear-gradient(180deg, #3da0a0, #2d8888)' }} />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)' }}
      />
    </div>
  );
}
