import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'HOME', id: 'hero' },
  { label: 'ABOUT', id: 'about' },
  { label: 'PROJECT', id: 'etymology' },
  { label: 'CONTACT', id: 'contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-[100]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Left: Logo badge ── */}
          <button
            onClick={() => scrollTo('hero')}
            className="group"
          >
            <div
              className="bg-black px-4 py-2.5 flex items-center gap-2 transition-transform duration-150 active:translate-y-[1px]"
              style={{
                boxShadow: '4px 4px 0 0 #0b0b0b, -4px 0 0 0 #0b0b0b, 4px 0 0 0 #0b0b0b, 0 -4px 0 0 #0b0b0b, 0 4px 0 0 #0b0b0b, -4px -4px 0 0 #0b0b0b, 4px -4px 0 0 #0b0b0b, -4px 4px 0 0 #0b0b0b',
              }}
            >
              <span className="font-pixel text-white text-[10px] md:text-[12px] tracking-wide group-hover:text-yellow transition-colors">
                TMGC.V1
              </span>
            </div>
          </button>

          {/* ── Right: Heart + Menu buttons ── */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Heart / Like button */}
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center transition-transform duration-150 active:scale-90"
              style={{
                background: liked ? '#ff3ea5' : '#ff3ea5',
                boxShadow: '3px 3px 0 0 #0b0b0b, -3px 0 0 0 #0b0b0b, 3px 0 0 0 #0b0b0b, 0 -3px 0 0 #0b0b0b, 0 3px 0 0 #0b0b0b, -3px -3px 0 0 #0b0b0b, 3px -3px 0 0 #0b0b0b, -3px 3px 0 0 #0b0b0b',
              }}
              aria-label="Like"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                className="pixel-render"
                style={{ imageRendering: 'pixelated' }}
              >
                {/* Pixel heart */}
                <rect x="2" y="2" width="4" height="2" fill="white" />
                <rect x="10" y="2" width="4" height="2" fill="white" />
                <rect x="1" y="4" width="6" height="2" fill="white" />
                <rect x="9" y="4" width="6" height="2" fill="white" />
                <rect x="0" y="6" width="16" height="2" fill="white" />
                <rect x="1" y="8" width="14" height="2" fill="white" />
                <rect x="2" y="10" width="12" height="2" fill="white" />
                <rect x="4" y="12" width="8" height="2" fill="white" />
                <rect x="6" y="14" width="4" height="2" fill="white" />
              </svg>
            </button>

            {/* Hamburger / Menu button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 md:w-11 md:h-11 flex flex-col items-center justify-center gap-[4px] bg-white transition-transform duration-150 active:scale-90"
              style={{
                boxShadow: '3px 3px 0 0 #0b0b0b, -3px 0 0 0 #0b0b0b, 3px 0 0 0 #0b0b0b, 0 -3px 0 0 #0b0b0b, 0 3px 0 0 #0b0b0b, -3px -3px 0 0 #0b0b0b, 3px -3px 0 0 #0b0b0b, -3px 3px 0 0 #0b0b0b',
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6, backgroundColor: '#ff3ea5' } : { rotate: 0, y: 0, backgroundColor: '#0b0b0b' }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[3px]"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-[3px] bg-black"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6, backgroundColor: '#ff3ea5' } : { rotate: 0, y: 0, backgroundColor: '#0b0b0b' }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[3px]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-black border-t-4 border-pink"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-5">
              {/* Pixel divider top */}
              <div className="flex gap-[2px] mb-5">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="h-[3px] flex-1"
                    style={{
                      backgroundColor: i % 3 === 0 ? '#ff3ea5' : i % 3 === 1 ? '#f7ea58' : '#63c5ff',
                      opacity: 0.4,
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.06, duration: 0.2 }}
                    onClick={() => scrollTo(item.id)}
                    className="group flex items-center gap-3 px-4 py-3.5 text-left hover:bg-pink/10 transition-all duration-150 border border-transparent hover:border-pink/30"
                  >
                    {/* Pixel bullet */}
                    <span className="w-3 h-3 bg-pink/40 group-hover:bg-yellow flex-shrink-0 transition-colors duration-150" />
                    <div className="flex flex-col">
                      <span className="font-pixel text-[9px] md:text-[10px] text-white group-hover:text-yellow transition-colors duration-150">
                        {item.label}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 group-hover:text-white/50 transition-colors duration-150 mt-0.5">
                        {item.id === 'hero' && '↑ BACK TO TOP'}
                        {item.id === 'about' && '// WHO ARE THEY?'}
                        {item.id === 'etymology' && '// ORIGIN STORY'}
                        {item.id === 'contact' && '// GET IN TOUCH'}
                      </span>
                    </div>
                    <span className="ml-auto font-pixel text-[10px] text-white/20 group-hover:text-pink group-hover:translate-x-1 transition-all duration-150">
                      ▶
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Pixel divider bottom */}
              <div className="flex gap-[2px] mt-5">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="h-[3px] flex-1"
                    style={{
                      backgroundColor: i % 2 === 0 ? '#ff3ea5' : 'transparent',
                      opacity: 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
