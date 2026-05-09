import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PixelCheckerBorder } from './PixelBorder';
import PixelMascot from './PixelMascot';

function PixelEgg({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 20 24" className="pixel-render" style={{ imageRendering: 'pixelated' }}>
      <rect x="7" y="1" width="6" height="2" fill="#f0f0f0" />
      <rect x="5" y="3" width="10" height="2" fill="#f0f0f0" />
      <rect x="4" y="5" width="12" height="2" fill="#ffffff" />
      <rect x="3" y="7" width="14" height="2" fill="#ffffff" />
      <rect x="3" y="9" width="14" height="2" fill="#ffffff" />
      <rect x="3" y="11" width="14" height="2" fill="#ffffff" />
      <rect x="3" y="13" width="14" height="2" fill="#f0f0f0" />
      <rect x="4" y="15" width="12" height="2" fill="#f0f0f0" />
      <rect x="5" y="17" width="10" height="2" fill="#e8e8e8" />
      <rect x="7" y="19" width="6" height="2" fill="#e8e8e8" />
      {/* Outline */}
      <rect x="7" y="0" width="6" height="1" fill="#0b0b0b" />
      <rect x="5" y="1" width="2" height="2" fill="#0b0b0b" />
      <rect x="13" y="1" width="2" height="2" fill="#0b0b0b" />
      <rect x="4" y="3" width="1" height="2" fill="#0b0b0b" />
      <rect x="15" y="3" width="1" height="2" fill="#0b0b0b" />
      <rect x="3" y="5" width="1" height="2" fill="#0b0b0b" />
      <rect x="16" y="5" width="1" height="2" fill="#0b0b0b" />
      <rect x="2" y="7" width="1" height="8" fill="#0b0b0b" />
      <rect x="17" y="7" width="1" height="8" fill="#0b0b0b" />
      <rect x="3" y="15" width="1" height="2" fill="#0b0b0b" />
      <rect x="16" y="15" width="1" height="2" fill="#0b0b0b" />
      <rect x="4" y="17" width="1" height="2" fill="#0b0b0b" />
      <rect x="15" y="17" width="1" height="2" fill="#0b0b0b" />
      <rect x="5" y="19" width="2" height="2" fill="#0b0b0b" />
      <rect x="13" y="19" width="2" height="2" fill="#0b0b0b" />
      <rect x="7" y="21" width="6" height="1" fill="#0b0b0b" />
      {/* Shine */}
      <rect x="6" y="5" width="2" height="2" fill="rgba(255,255,255,0.6)" />
      <rect x="6" y="7" width="1" height="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function PixelClock({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="pixel-render" style={{ imageRendering: 'pixelated' }}>
      <rect x="8" y="1" width="8" height="2" fill="#f7ea58" />
      <rect x="5" y="3" width="14" height="2" fill="#f7ea58" />
      <rect x="3" y="5" width="18" height="2" fill="#f7ea58" />
      <rect x="2" y="7" width="20" height="2" fill="#f7ea58" />
      <rect x="2" y="9" width="20" height="2" fill="#f7ea58" />
      <rect x="2" y="11" width="20" height="2" fill="#f7ea58" />
      <rect x="2" y="13" width="20" height="2" fill="#f7ea58" />
      <rect x="3" y="15" width="18" height="2" fill="#f7ea58" />
      <rect x="5" y="17" width="14" height="2" fill="#f7ea58" />
      <rect x="8" y="19" width="8" height="2" fill="#f7ea58" />
      {/* Clock face */}
      <rect x="8" y="5" width="8" height="2" fill="#ffffff" />
      <rect x="6" y="7" width="12" height="2" fill="#ffffff" />
      <rect x="5" y="9" width="14" height="2" fill="#ffffff" />
      <rect x="5" y="11" width="14" height="2" fill="#ffffff" />
      <rect x="6" y="13" width="12" height="2" fill="#ffffff" />
      <rect x="8" y="15" width="8" height="2" fill="#ffffff" />
      {/* Hands */}
      <rect x="11" y="7" width="2" height="6" fill="#0b0b0b" />
      <rect x="13" y="9" width="4" height="2" fill="#0b0b0b" />
      <rect x="11" y="11" width="2" height="2" fill="#ff3ea5" />
      {/* Numbers */}
      <rect x="11" y="5" width="2" height="1" fill="#0b0b0b" />
      <rect x="17" y="11" width="1" height="1" fill="#0b0b0b" />
      <rect x="11" y="16" width="2" height="1" fill="#0b0b0b" />
      <rect x="6" y="11" width="1" height="1" fill="#0b0b0b" />
      {/* Outline */}
      <rect x="8" y="0" width="8" height="1" fill="#0b0b0b" />
      <rect x="5" y="1" width="3" height="2" fill="#0b0b0b" />
      <rect x="16" y="1" width="3" height="2" fill="#0b0b0b" />
      <rect x="3" y="3" width="2" height="2" fill="#0b0b0b" />
      <rect x="19" y="3" width="2" height="2" fill="#0b0b0b" />
      <rect x="1" y="7" width="1" height="8" fill="#0b0b0b" />
      <rect x="22" y="7" width="1" height="8" fill="#0b0b0b" />
      <rect x="2" y="5" width="1" height="2" fill="#0b0b0b" />
      <rect x="21" y="5" width="1" height="2" fill="#0b0b0b" />
      <rect x="2" y="15" width="1" height="2" fill="#0b0b0b" />
      <rect x="21" y="15" width="1" height="2" fill="#0b0b0b" />
      <rect x="3" y="17" width="2" height="2" fill="#0b0b0b" />
      <rect x="19" y="17" width="2" height="2" fill="#0b0b0b" />
      <rect x="5" y="19" width="3" height="2" fill="#0b0b0b" />
      <rect x="16" y="19" width="3" height="2" fill="#0b0b0b" />
      <rect x="8" y="21" width="8" height="1" fill="#0b0b0b" />
      {/* Bell top */}
      <rect x="4" y="0" width="3" height="1" fill="#0b0b0b" />
      <rect x="17" y="0" width="3" height="1" fill="#0b0b0b" />
    </svg>
  );
}

export default function EtymologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="etymology"
      ref={sectionRef}
      className="relative bg-yellow min-h-screen py-20 md:py-28 overflow-hidden"
    >
      {/* Corner checker decorations */}
      <div className="absolute top-10 right-0 w-20 h-40 md:w-40 md:h-80 pixel-checker opacity-50" />
      <div className="absolute bottom-10 left-0 w-24 h-20 md:w-56 md:h-40 pixel-checker opacity-40" />
      <div className="absolute top-0 left-[30%] w-16 h-16 md:w-32 md:h-32 pixel-checker opacity-20" />

      {/* Pixel block scatter */}
      <div className="absolute top-[20%] left-[5%] w-3 h-3 bg-black/20" />
      <div className="absolute top-[30%] right-[12%] w-4 h-4 bg-black/15" />
      <div className="absolute bottom-[25%] left-[8%] w-2 h-2 bg-black/25" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-8">
        {/* Section heading */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-pixel text-black text-right leading-[0.9] mb-14 md:mb-20"
          style={{
            fontSize: 'clamp(32px, 6vw, 90px)',
          }}
        >
          ETYMOLOGY
        </motion.h2>

        {/* Egg + Clock layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 mb-16">
          {/* Egg */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="animate-pixel-float">
              <PixelEgg size={110} />
            </div>
            <span className="font-pixel text-[9px] md:text-[10px] text-black/60 tracking-widest">EGG</span>
          </motion.div>

          {/* Plus sign */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="font-pixel text-3xl md:text-5xl text-black font-bold"
          >
            +
          </motion.div>

          {/* Clock */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="animate-pixel-float" style={{ animationDelay: '1s' }}>
              <PixelClock size={110} />
            </div>
            <span className="font-pixel text-[9px] md:text-[10px] text-black/60 tracking-widest">WATCH</span>
          </motion.div>
        </div>

        {/* Japanese vertical text - right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.45 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute right-4 md:right-14 top-[38%] md:top-[32%] text-black/40 text-3xl md:text-5xl leading-loose font-bold"
          style={{ writingMode: 'vertical-rl', fontFamily: 'serif' }}
        >
          ウォッチ
        </motion.div>

        {/* Japanese vertical text - left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute left-4 md:left-14 top-[48%] text-black/30 text-2xl md:text-4xl leading-loose"
          style={{ writingMode: 'vertical-rl', fontFamily: 'serif' }}
        >
          たまご
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
          className="max-w-lg mx-auto mb-14"
        >
          <div className="bg-white pixel-border-thick p-5 md:p-7 relative">
            <p className="font-mono text-[11px] md:text-sm text-black leading-[1.7] text-center">
              The word <span className="font-bold bg-yellow/60 px-1">「たまごっち」</span> (Tamagotchi)
              comes from combining the Japanese words for{' '}
              <span className="font-bold text-pink">egg (tamago 卵)</span> and{' '}
              <span className="font-bold text-pixel-blue">watch (uotchi ウォッチ)</span>.
            </p>
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div className="w-3 h-3 bg-white border-b-[3px] border-r-[3px] border-black transform rotate-45 -translate-y-1.5" />
            </div>
          </div>
        </motion.div>

        {/* Mascot at bottom */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="flex justify-center mt-6"
        >
          <div className="animate-pixel-bounce">
            <PixelMascot size={48} />
          </div>
        </motion.div>
      </div>

      {/* Bottom pixel border */}
      <PixelCheckerBorder position="bottom" color1="#0b0b0b" color2="#f7ea58" height={32} />
    </section>
  );
}
