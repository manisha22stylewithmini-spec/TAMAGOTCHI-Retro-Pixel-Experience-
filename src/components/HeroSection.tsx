import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelCloud from './PixelCloud';
import PixelParticles from './PixelParticles';
import PixelMascot from './PixelMascot';
import MiniGame from './MiniGame';
import RetroTV from './RetroTV';
import { PixelCheckerBorder } from './PixelBorder';


export default function HeroSection() {
  const [showGame, setShowGame] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameBest, setGameBest] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'over'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = useCallback(() => {
    if (showGame) return;
    setGlitching(true);
    setTimeout(() => {
      setShowGame(true);
      setGlitching(false);
    }, 400);
  }, [showGame]);



  const handleScoreChange = useCallback((score: number, best: number) => {
    setGameScore(score);
    setGameBest(best);
  }, []);

  const handleGameStateChange = useCallback((state: 'idle' | 'running' | 'over') => {
    setGameState(state);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' && !showGame) {
        e.preventDefault();
        handleStartClick();
      }
    };
    window.addEventListener('keydown', handleKey, { passive: false });
    return () => window.removeEventListener('keydown', handleKey);
  }, [showGame, handleStartClick]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-sky overflow-hidden scanlines crt-flicker flex flex-col"
    >
      {/* Pink side borders */}
      <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-pink z-10 hidden md:block" />
      <div className="absolute top-0 right-0 w-8 md:w-16 h-full bg-pink z-10 hidden md:block" />

      {/* Sky background gradient */}
      <div className="absolute inset-0 md:left-16 md:right-16 bg-gradient-to-b from-[#7ec8f0] via-sky to-[#b8e4ff]" />

      {/* Pixel scattered blocks on the sides */}
      <div className="absolute top-[20%] left-0 w-8 md:w-16 z-20 hidden md:flex flex-col gap-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex">
            <div className={`w-4 h-4 ${i % 3 === 0 ? 'bg-black' : i % 3 === 1 ? 'bg-pink' : 'bg-transparent'}`} />
            <div className={`w-4 h-4 ${i % 3 === 1 ? 'bg-black' : i % 3 === 2 ? 'bg-pink' : 'bg-transparent'}`} />
            <div className={`w-4 h-4 ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'} hidden lg:block`} />
            <div className={`w-4 h-4 ${i % 2 === 1 ? 'bg-black' : 'bg-pink'} hidden lg:block`} />
          </div>
        ))}
      </div>
      <div className="absolute top-[15%] right-0 w-8 md:w-16 z-20 hidden md:flex flex-col gap-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex">
            <div className={`w-4 h-4 ${i % 3 === 1 ? 'bg-black' : i % 3 === 0 ? 'bg-pink' : 'bg-transparent'}`} />
            <div className={`w-4 h-4 ${i % 3 === 0 ? 'bg-black' : i % 3 === 2 ? 'bg-pink' : 'bg-transparent'}`} />
            <div className={`w-4 h-4 ${i % 2 === 1 ? 'bg-black' : 'bg-transparent'} hidden lg:block`} />
            <div className={`w-4 h-4 ${i % 2 === 0 ? 'bg-black' : 'bg-pink'} hidden lg:block`} />
          </div>
        ))}
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 md:left-16 md:right-16">
        <PixelCloud />
      </div>

      {/* Pixel particles */}
      <PixelParticles count={15} colors={['#ff3ea5', '#f7ea58', '#ffffff']} />

      {/* Pink pixel decorations */}
      <div className="absolute top-[15%] left-[8%] w-4 h-4 bg-pink animate-pixel-float z-20" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[25%] right-[10%] w-3 h-3 bg-pink animate-pixel-float z-20" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[55%] left-[15%] w-2 h-2 bg-pink animate-pixel-float z-20" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-[45%] right-[18%] w-5 h-5 bg-pink animate-pixel-float z-20" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[65%] left-[25%] w-3 h-3 bg-yellow animate-pixel-float z-20" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 md:px-20 lg:px-24 pt-16 md:pt-20">
        {/* Subtitle bubble — hidden when game active */}
        {!showGame && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="mb-6 bg-pink text-white font-mono text-[8px] md:text-[10px] px-5 py-2.5 pixel-border text-center max-w-[360px] leading-relaxed uppercase"
          >
            Your pixel pet, your care, your nostalgia. Discover how a tiny egg won millions of hearts worldwide
          </motion.div>
        )}

        {/* Logo */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={logoVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 15, duration: 0.6 }}
          className={`font-pixel text-white text-center leading-none transition-all duration-500 w-full ${glitching ? 'animate-glitch' : ''} ${showGame ? 'mb-0' : 'mb-2'}`}
          style={{
            fontSize: showGame ? 'clamp(20px, 4.5vw, 64px)' : 'clamp(28px, 8.5vw, 160px)',
            textShadow: showGame
              ? '3px 3px 0 #0b0b0b, -2px -2px 0 #0b0b0b, 2px -2px 0 #0b0b0b, -2px 2px 0 #0b0b0b'
              : '6px 6px 0 #0b0b0b, -2px -2px 0 #0b0b0b, 2px -2px 0 #0b0b0b, -2px 2px 0 #0b0b0b, 0 6px 0 #0b0b0b',
            letterSpacing: '-0.04em',
          }}
        >
          TAMAGOTCHI
        </motion.h1>

        {/* Mascot / Game */}
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="mascot"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="my-5"
            >
              <div className="animate-sprite-idle">
                <PixelMascot size={88} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 mb-2"
            >
              {/* Game area — TV + Score cards below */}
              <div className="flex flex-col items-center gap-4 sm:gap-5 w-full" style={{ maxWidth: '620px' }}>
                {/* The TV — fully responsive */}
                <RetroTV>
                  <MiniGame
                    autoStart
                    onScoreChange={handleScoreChange}
                    onGameStateChange={handleGameStateChange}
                  />
                </RetroTV>

                {/* Score Panel — 3 equal cards in a row, matches TV width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="grid grid-cols-3 gap-2 sm:gap-3 w-full"
                >
                  {/* Score */}
                  <div className="bg-black/80 pixel-border px-2 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center text-center">
                    <p className="font-pixel text-[5px] sm:text-[6px] md:text-[7px] text-pink mb-1 sm:mb-1.5 uppercase tracking-wider">Score</p>
                    <p className="font-pixel text-[14px] sm:text-[18px] md:text-[22px] text-yellow leading-none">
                      {String(gameScore).padStart(4, '0')}
                    </p>
                  </div>

                  {/* Best */}
                  <div className="bg-black/80 pixel-border px-2 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center text-center">
                    <p className="font-pixel text-[5px] sm:text-[6px] md:text-[7px] text-pixel-blue mb-1 sm:mb-1.5 uppercase tracking-wider">Best</p>
                    <p className="font-pixel text-[14px] sm:text-[18px] md:text-[22px] text-white/70 leading-none">
                      {String(gameBest).padStart(4, '0')}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-black/80 pixel-border px-2 sm:px-4 py-2.5 sm:py-3 flex flex-col items-center justify-center text-center">
                    <p className="font-pixel text-[5px] sm:text-[6px] md:text-[7px] text-white/40 mb-1 sm:mb-1.5 uppercase tracking-wider">Status</p>
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 flex-shrink-0 ${
                        gameState === 'running' ? 'bg-pixel-green animate-pulse' :
                        gameState === 'over' ? 'bg-pink' : 'bg-white/30'
                      }`} />
                      <p className={`font-pixel text-[8px] sm:text-[10px] md:text-[12px] leading-none ${
                        gameState === 'running' ? 'text-pixel-green' :
                        gameState === 'over' ? 'text-pink' : 'text-white/40'
                      }`}>
                        {gameState === 'running' ? 'LIVE' : gameState === 'over' ? 'DEAD' : 'IDLE'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Button + hint — with extra spacing */}
        {!showGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="flex flex-col items-center gap-2 mt-6"
          >
            <button
              onClick={handleStartClick}
              className="group bg-[#111111] text-white font-pixel text-[10px] md:text-[13px] px-8 py-4 pixel-border-thick hover:-translate-y-1 transition-transform duration-200 active:translate-y-1 flex items-center gap-3"
            >
              <span className="text-pink group-hover:text-yellow transition-colors">▶</span>
              Press start
            </button>
            <span className="font-mono text-[9px] text-black/40">
              or press <span className="font-pixel text-[8px] text-black/60 bg-white/30 px-1.5 py-0.5">SPACE</span>
            </span>
          </motion.div>
        )}


      </div>

      {/* Bottom navigation bar */}
      <div className="relative z-30 mt-auto">
        <div className="bg-pink py-3.5 px-4 flex items-center justify-center gap-6 md:gap-10 border-t-4 border-black">
          {[
            { label: 'HOME', id: 'hero' },
            { label: 'ABOUT', id: 'about' },
            { label: 'PROJECT', id: 'etymology' },
            { label: 'CONTACT', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="font-pixel text-[7px] md:text-[9px] text-white hover:text-yellow transition-colors tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom pixel border */}
      <div className="relative z-30">
        <PixelCheckerBorder position="bottom" color1="#0b0b0b" color2="transparent" height={32} />
      </div>
    </section>
  );
}
