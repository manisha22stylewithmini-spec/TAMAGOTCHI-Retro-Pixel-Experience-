import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 60; // ~2 seconds at 30fps feel
    const interval = setInterval(() => {
      frame++;
      const p = Math.min(100, Math.round((frame / totalFrames) * 100));
      setProgress(p);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    }, 33);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
            }}
          />

          {/* Floating pixel egg */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <svg
              width="72"
              height="88"
              viewBox="0 0 18 22"
              className="pixel-render"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Egg outline */}
              <rect x="6" y="0" width="6" height="1" fill="#0b0b0b" />
              <rect x="4" y="1" width="2" height="1" fill="#0b0b0b" />
              <rect x="12" y="1" width="2" height="1" fill="#0b0b0b" />
              <rect x="3" y="2" width="1" height="2" fill="#0b0b0b" />
              <rect x="14" y="2" width="1" height="2" fill="#0b0b0b" />
              <rect x="2" y="4" width="1" height="2" fill="#0b0b0b" />
              <rect x="15" y="4" width="1" height="2" fill="#0b0b0b" />
              <rect x="1" y="6" width="1" height="8" fill="#0b0b0b" />
              <rect x="16" y="6" width="1" height="8" fill="#0b0b0b" />
              <rect x="2" y="14" width="1" height="2" fill="#0b0b0b" />
              <rect x="15" y="14" width="1" height="2" fill="#0b0b0b" />
              <rect x="3" y="16" width="1" height="2" fill="#0b0b0b" />
              <rect x="14" y="16" width="1" height="2" fill="#0b0b0b" />
              <rect x="4" y="18" width="2" height="1" fill="#0b0b0b" />
              <rect x="12" y="18" width="2" height="1" fill="#0b0b0b" />
              <rect x="6" y="19" width="6" height="1" fill="#0b0b0b" />

              {/* Egg body - white */}
              <rect x="6" y="1" width="6" height="1" fill="#ffffff" />
              <rect x="4" y="2" width="10" height="2" fill="#ffffff" />
              <rect x="3" y="4" width="12" height="2" fill="#ffffff" />
              <rect x="2" y="6" width="14" height="8" fill="#ffffff" />
              <rect x="3" y="14" width="12" height="2" fill="#ffffff" />
              <rect x="4" y="16" width="10" height="2" fill="#ffffff" />
              <rect x="6" y="18" width="6" height="1" fill="#ffffff" />

              {/* Egg pattern - pink zigzag band */}
              <rect x="2" y="9" width="2" height="2" fill="#ff3ea5" />
              <rect x="4" y="8" width="2" height="2" fill="#ff3ea5" />
              <rect x="6" y="9" width="2" height="2" fill="#ff3ea5" />
              <rect x="8" y="8" width="2" height="2" fill="#ff3ea5" />
              <rect x="10" y="9" width="2" height="2" fill="#ff3ea5" />
              <rect x="12" y="8" width="2" height="2" fill="#ff3ea5" />
              <rect x="14" y="9" width="2" height="2" fill="#ff3ea5" />

              {/* Yellow dots on egg */}
              <rect x="5" y="5" width="2" height="2" fill="#f7ea58" />
              <rect x="10" y="4" width="2" height="2" fill="#f7ea58" />
              <rect x="7" y="14" width="2" height="2" fill="#f7ea58" />
              <rect x="12" y="13" width="2" height="2" fill="#f7ea58" />

              {/* Shine highlight */}
              <rect x="5" y="2" width="2" height="2" fill="rgba(255,255,255,0.5)" />
              <rect x="4" y="4" width="1" height="2" fill="rgba(255,255,255,0.3)" />
            </svg>
          </motion.div>

          {/* Shadow under egg */}
          <motion.div
            animate={{ scaleX: [1, 0.7, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-2 rounded-full bg-white/5 mb-8"
          />

          {/* Loading text */}
          <p className="font-pixel text-[10px] sm:text-[12px] text-white/60 mb-4 tracking-widest">
            LOADING
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ...
            </motion.span>
          </p>

          {/* Progress bar */}
          <div className="w-48 sm:w-56 h-4 bg-white/10 pixel-border relative overflow-hidden">
            <motion.div
              className="h-full bg-pink"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Pixel segments inside bar */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-black/30 last:border-r-0"
                />
              ))}
            </div>
          </div>

          {/* Percentage */}
          <p className="font-pixel text-[8px] text-yellow mt-2">
            {progress}%
          </p>

          {/* Bottom text */}
          <p className="font-pixel text-[6px] sm:text-[7px] text-white/20 mt-6 tracking-[0.2em]">
            PIXEL WORLD v1.0
          </p>

          {/* Decorative corner pixels */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-pink/30" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-yellow/30" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-pixel-blue/30" />
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-pixel-green/30" />
          <div className="absolute top-4 left-8 w-2 h-2 bg-pink/15" />
          <div className="absolute top-8 left-4 w-2 h-2 bg-pink/15" />
          <div className="absolute bottom-4 right-8 w-2 h-2 bg-pixel-green/15" />
          <div className="absolute bottom-8 right-4 w-2 h-2 bg-pixel-green/15" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
