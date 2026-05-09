import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PixelEarth from './PixelEarth';
import PixelStars from './PixelStars';

function TypingText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !started) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }
  }, [isInView, delay, started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-cursor-blink text-pink">█</span>
      )}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Stars */}
      <PixelStars count={20} />

      {/* Decorative pixel elements */}
      <div className="absolute top-12 left-6 text-white/30 font-pixel text-[10px]">+</div>
      <div className="absolute top-28 right-10 text-white/20 font-pixel text-[14px]">✦</div>
      <div className="absolute bottom-36 left-12 text-white/25 font-pixel text-[8px]">◆</div>
      <div className="absolute top-[60%] right-[8%] text-white/20 font-pixel text-[16px]">+</div>
      <div className="absolute top-[42%] left-[3%] text-white/15 font-pixel text-[10px]">✦</div>

      {/* Right side checker decoration */}
      <div className="absolute top-0 right-0 hidden lg:block">
        <div className="flex flex-col">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="flex">
              {Array.from({ length: 4 }, (_, j) => (
                <div
                  key={j}
                  className={`w-4 h-4 ${(i + j) % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left column - 3/5 */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ x: -80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-pixel text-white leading-[0.85] mb-10 md:mb-14"
              style={{
                fontSize: 'clamp(36px, 7vw, 100px)',
              }}
            >
              WHO ARE
              <br />
              <span className="inline-block mt-2">THEY</span>
              <span className="text-pink">?</span>
            </motion.h2>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <p className="font-mono text-white/90 text-sm md:text-[15px] leading-[1.8]">
                    <TypingText
                      text="Tamagotchi are tiny digital creatures"
                      delay={600}
                      speed={25}
                    />{' '}
                    — <span className="bg-pink text-white px-1 py-0.5 font-bold">small beings</span>{' '}
                    from planet Tamagotchi, far away from Earth.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="font-mono text-white/80 text-xs md:text-sm leading-[1.8]">
                    They arrived on our planet in{' '}
                    <span className="bg-pink text-white px-1 py-0.5 font-bold">1996</span>{' '}
                    and since then have become the beloved virtual pets of millions worldwide. Tamagotchi love delicious food and games, though they can be a little{' '}
                    <span className="bg-yellow text-black px-1 py-0.5 font-bold">mischievous</span>.
                  </p>

                  <p className="font-mono text-white/60 text-[11px] md:text-xs leading-[1.8]">
                    Each one is unique: shy dreamers, unstoppable pranksters, foodie gourmands, or future rock stars. Their{' '}
                    <span className="text-yellow font-bold">personalities</span>{' '}
                    evolve depending on who cares for them. Mood, character, even career — everything depends on how much{' '}
                    <span className="bg-pink text-white px-1 py-0.5 font-bold">love</span>{' '}
                    and time you give them.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column - 2/5 - Earth */}
          <div className="lg:col-span-2 flex items-center justify-center mt-8 lg:mt-0">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
              className="relative"
            >
              {/* Shadow under earth */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-6 bg-pixel-blue/10 rounded-full blur-md" />

              <div className="animate-pixel-float">
                <PixelEarth size={200} className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px]" />
              </div>

              {/* Orbiting pixels */}
              <div className="absolute inset-[-20px] animate-slow-rotate pointer-events-none">
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow" />
                <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-pink" />
                <div className="absolute top-1/2 -left-2 w-2 h-2 bg-pixel-blue" />
                <div className="absolute top-1/2 -right-2 w-2 h-2 bg-pixel-green" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom pixel transition to yellow */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg width="100%" height="48" preserveAspectRatio="none" viewBox="0 0 2000 48" className="block w-full">
          {Array.from({ length: 125 }, (_, i) => (
            <g key={i}>
              <rect
                x={i * 16}
                y={0}
                width={16}
                height={16}
                fill={i % 5 === 0 || i % 7 === 0 ? '#f7ea58' : 'transparent'}
                opacity={0.3}
              />
              <rect
                x={i * 16}
                y={16}
                width={16}
                height={16}
                fill={i % 3 === 0 ? '#f7ea58' : i % 4 === 0 ? '#0b0b0b' : 'transparent'}
                opacity={0.5}
              />
              <rect
                x={i * 16}
                y={32}
                width={16}
                height={16}
                fill={i % 2 === 0 ? '#f7ea58' : '#0b0b0b'}
              />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
