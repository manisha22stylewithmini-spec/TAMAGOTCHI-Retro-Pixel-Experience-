import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import PixelMascot from './PixelMascot';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" ref={ref} className="relative bg-black py-16 md:py-24 overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="w-full"
            style={{
              height: '1px',
              marginTop: '6px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Logo area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-5 mb-12"
        >
          <div className="animate-pixel-bounce">
            <PixelMascot size={36} />
          </div>
          <h3
            className="font-pixel text-white text-center"
            style={{
              fontSize: 'clamp(14px, 2.5vw, 28px)',
              textShadow: '3px 3px 0 #ff3ea5',
            }}
          >
            TAMAGOTCHI
          </h3>
          <div className="w-12 h-0.5 bg-pink" />
        </motion.div>

        {/* Contact blurb */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[10px] md:text-xs text-white/40 max-w-md mx-auto leading-relaxed">
            Want to relive the nostalgia? Drop us a pixel-powered message.
            We'd love to hear from fellow Tamagotchi fans.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-5 md:gap-10 mb-12"
        >
          {[
            { label: 'HOME', id: 'hero' },
            { label: 'ABOUT', id: 'about' },
            { label: 'PROJECT', id: 'etymology' },
            { label: 'CONTACT', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() =>
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="font-pixel text-[7px] md:text-[9px] text-white/50 hover:text-pink transition-colors tracking-wider relative group"
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-pink transition-all duration-300 ${
                  hoveredLink === item.label ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10">
          <div className="w-8 h-px bg-pink mx-auto" />
        </div>

        {/* Credits row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="font-mono text-[9px] md:text-[10px] text-white/25 tracking-wider uppercase">
            © 2025 Pixel Experience Powered by Delulu
          </p>

          {/* Terminal cursor */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-pixel-green/60">&gt;</span>
            <span className="font-mono text-[10px] text-white/40">_</span>
            <span className="font-mono text-[10px] text-pixel-green animate-cursor-blink">
              █
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="font-pixel text-[7px] md:text-[8px] text-pink hover:text-yellow transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform">▲</span>
            BACK TO TOP
          </button>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="font-mono text-[8px] text-white/10 tracking-[0.3em] uppercase">
            Made by ♥ and Manisha Baroliya
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
