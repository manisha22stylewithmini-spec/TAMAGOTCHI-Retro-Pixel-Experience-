import { useEffect, useRef, useState, useCallback } from 'react';
import { playJumpSfx, playScoreSfx, playGameOverSfx, playStartSfx, startBgm, stopBgm } from './AudioEngine';

// ── Types ────────────────────────────────────────────────────
interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'cactus' | 'glitch' | 'tall' | 'low';
  passed: boolean;
}

// ── Constants ────────────────────────────────────────────────
const W = 320;
const H = 180;
const GROUND_Y = H - 28;
const PLAYER_W = 16;
const PLAYER_H = 18;
const GRAVITY = 1400;
const JUMP_VELOCITY = -420;
const SCROLL_SPEED_BASE = 140;
const SPAWN_MIN = 700;
const SPAWN_MAX = 1800;

interface MiniGameProps {
  autoStart?: boolean;
  onScoreChange?: (score: number, best: number) => void;
  onGameStateChange?: (state: 'idle' | 'running' | 'over') => void;
}

export default function MiniGame({ autoStart = false, onScoreChange, onGameStateChange }: MiniGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);
  const didAutoStart = useRef(false);

  const playerRef = useRef({ x: 40, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true, frame: 0 });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const scrollSpeedRef = useRef(SCROLL_SPEED_BASE);
  const nextSpawnRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const frameRef = useRef(0);
  const gameActiveRef = useRef(false);
  const animRef = useRef(0);
  const jumpHeldRef = useRef(false);
  const groundOffsetRef = useRef(0);

  // ── Drawing helpers ────────────────────────────────────────
  const px = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }, []);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D) => {
    const p = playerRef.current;
    const x = Math.round(p.x);
    const y = Math.round(p.y);
    const f = p.frame;
    px(ctx, x + 2, y, 12, 14, '#0b0b0b');
    px(ctx, x + 4, y - 4, 8, 6, '#0b0b0b');
    px(ctx, x + 2, y - 6, 4, 4, '#0b0b0b');
    px(ctx, x + 10, y - 6, 4, 4, '#0b0b0b');
    px(ctx, x + 3, y - 5, 2, 2, '#ff3ea5');
    px(ctx, x + 11, y - 5, 2, 2, '#ff3ea5');
    px(ctx, x + 5, y - 2, 2, 3, '#ffffff');
    px(ctx, x + 9, y - 2, 2, 3, '#ffffff');
    px(ctx, x + 5, y - 1, 1, 2, '#63c5ff');
    px(ctx, x + 10, y - 1, 1, 2, '#63c5ff');
    px(ctx, x + 7, y + 2, 3, 1, '#ff3ea5');
    px(ctx, x + 5, y + 6, 6, 4, '#222');
    if (p.onGround) {
      const lo = f % 2 === 0;
      px(ctx, x + 3, y + 14, 4, lo ? 3 : 4, '#0b0b0b');
      px(ctx, x + 9, y + 14, 4, lo ? 4 : 3, '#0b0b0b');
    } else {
      px(ctx, x + 4, y + 14, 3, 2, '#0b0b0b');
      px(ctx, x + 9, y + 14, 3, 2, '#0b0b0b');
    }
  }, [px]);

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, o: Obstacle) => {
    const t = Math.floor(Date.now() / 200);
    if (o.type === 'glitch') {
      const cols = ['#ff3ea5', '#63c5ff', '#f7ea58', '#0b0b0b'];
      const bx = 4;
      for (let i = 0; i < Math.ceil(o.w / bx); i++)
        for (let j = 0; j < Math.ceil(o.h / bx); j++)
          px(ctx, Math.round(o.x) + i * bx, Math.round(o.y) + j * bx, bx, bx, cols[(i + j + t) % 4]);
    } else if (o.type === 'cactus') {
      px(ctx, Math.round(o.x) + 2, Math.round(o.y), o.w - 4, o.h, '#5dd84f');
      px(ctx, Math.round(o.x), Math.round(o.y) + 6, o.w, 6, '#5dd84f');
      px(ctx, Math.round(o.x) + 1, Math.round(o.y) + 2, 2, 2, '#3daa2f');
      px(ctx, Math.round(o.x) + 2, Math.round(o.y) - 1, o.w - 4, 1, '#0b0b0b');
    } else if (o.type === 'tall') {
      px(ctx, Math.round(o.x), Math.round(o.y), o.w, o.h, '#ff3ea5');
      px(ctx, Math.round(o.x) + 2, Math.round(o.y) + 2, o.w - 4, o.h - 4, '#0b0b0b');
      for (let i = 0; i < o.h; i += 4)
        px(ctx, Math.round(o.x), Math.round(o.y) + i, o.w, 1, 'rgba(255,255,255,0.15)');
    } else {
      px(ctx, Math.round(o.x), Math.round(o.y), o.w, o.h, '#f7ea58');
      px(ctx, Math.round(o.x) + 1, Math.round(o.y) + 1, o.w - 2, o.h - 2, '#0b0b0b');
      px(ctx, Math.round(o.x) + 3, Math.round(o.y) + 3, o.w - 6, o.h - 6, '#f7ea58');
    }
  }, [px]);

  const spawnObstacle = useCallback(() => {
    const types: Obstacle['type'][] = ['cactus', 'glitch', 'tall', 'low'];
    const type = types[Math.floor(Math.random() * types.length)];
    let w: number, h: number, y: number;
    switch (type) {
      case 'cactus': w = 10; h = 20 + Math.floor(Math.random() * 10); y = GROUND_Y - h; break;
      case 'glitch': w = 16; h = 16; y = GROUND_Y - h; break;
      case 'tall':   w = 12; h = 32 + Math.floor(Math.random() * 12); y = GROUND_Y - h; break;
      case 'low':    w = 20; h = 10; y = GROUND_Y - h; break;
      default:       w = 14; h = 16; y = GROUND_Y - h;
    }
    obstaclesRef.current.push({ x: W + 10, y, w, h, type, passed: false });
    nextSpawnRef.current = Math.max(400, SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN) - scoreRef.current * 8);
  }, []);

  // ── Reset ──────────────────────────────────────────────────
  const resetGame = useCallback(() => {
    playerRef.current = { x: 40, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true, frame: 0 };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    scrollSpeedRef.current = SCROLL_SPEED_BASE;
    spawnTimerRef.current = 0;
    nextSpawnRef.current = 800;
    frameRef.current = 0;
    groundOffsetRef.current = 0;
    setScore(0);
    setGameOver(false);
    setRunning(true);
    gameActiveRef.current = true;
    onScoreChange?.(0, bestScoreRef.current);
    onGameStateChange?.('running');
    playStartSfx();
    startBgm();
  }, [onScoreChange, onGameStateChange]);

  // ── Auto-start ─────────────────────────────────────────────
  useEffect(() => {
    if (autoStart && !didAutoStart.current) {
      didAutoStart.current = true;
      const t = setTimeout(() => resetGame(), 120);
      return () => clearTimeout(t);
    }
  }, [autoStart, resetGame]);

  // ── Key handling ───────────────────────────────────────────
  useEffect(() => {
    const GAME_KEYS = new Set(['ArrowUp', 'ArrowDown', ' ', 'w', 's']);
    const down = (e: KeyboardEvent) => {
      if (GAME_KEYS.has(e.key)) e.preventDefault();
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        if (!gameActiveRef.current) { resetGame(); return; }
        jumpHeldRef.current = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (GAME_KEYS.has(e.key)) e.preventDefault();
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') jumpHeldRef.current = false;
    };
    window.addEventListener('keydown', down, { passive: false });
    window.addEventListener('keyup', up, { passive: false });
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [resetGame]);

  // ── Game loop ──────────────────────────────────────────────
  useEffect(() => {
    if (!running || gameOver) { gameActiveRef.current = false; return; }
    gameActiveRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    let prev = performance.now();

    const loop = (now: number) => {
      if (!gameActiveRef.current) return;
      const dtMs = now - prev; prev = now;
      const dt = Math.min(dtMs / 1000, 0.05);
      const p = playerRef.current;

      // Jump
      if (jumpHeldRef.current && p.onGround) {
        p.vy = JUMP_VELOCITY;
        p.onGround = false;
        playJumpSfx();
      }

      // Physics
      p.vy += GRAVITY * dt;
      p.y += p.vy * dt;
      if (p.y >= GROUND_Y - PLAYER_H) { p.y = GROUND_Y - PLAYER_H; p.vy = 0; p.onGround = true; }

      scrollSpeedRef.current = SCROLL_SPEED_BASE + scoreRef.current * 2;
      const spd = scrollSpeedRef.current;
      frameRef.current += dt * 8;
      p.frame = Math.floor(frameRef.current) % 4;

      // Spawn
      spawnTimerRef.current += dtMs;
      if (spawnTimerRef.current >= nextSpawnRef.current) { spawnTimerRef.current = 0; spawnObstacle(); }

      // Obstacles & collision
      let died = false;
      const px2 = p.x + 3, py2 = p.y + 2, pw2 = PLAYER_W - 6, ph2 = PLAYER_H - 4;
      obstaclesRef.current = obstaclesRef.current.filter((o) => {
        o.x -= spd * dt;
        if (o.x + o.w < -10) return false;
        if (!o.passed && o.x + o.w < p.x) {
          o.passed = true;
          scoreRef.current += 1;
          setScore(scoreRef.current);
          onScoreChange?.(scoreRef.current, bestScoreRef.current);
          playScoreSfx();
        }
        if (px2 < o.x + o.w && px2 + pw2 > o.x && py2 < o.y + o.h && py2 + ph2 > o.y) died = true;
        return true;
      });

      if (died) {
        gameActiveRef.current = false;
        const newBest = Math.max(bestScoreRef.current, scoreRef.current);
        bestScoreRef.current = newBest;
        setGameOver(true);
        setBestScore(newBest);
        onScoreChange?.(scoreRef.current, newBest);
        onGameStateChange?.('over');
        playGameOverSfx();
        stopBgm();
        return;
      }

      groundOffsetRef.current = (groundOffsetRef.current + spd * dt) % 16;

      // ── Draw ──────────────────────────────────────────────
      ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      const starSeed = [12,45,78,120,200,260,35,90,150,180,230,290,55,105,175,245,300];
      const starY = [10,25,8,18,30,14,40,22,5,35,42,16,48,28,38,12,20];
      for (let i = 0; i < starSeed.length; i++) {
        const sx = (starSeed[i] + groundOffsetRef.current * 0.2) % W;
        ctx.fillRect(Math.round(sx), starY[i], 2, 2);
      }

      // City
      ctx.fillStyle = '#111122';
      const co = groundOffsetRef.current * 0.3;
      for (let i = 0; i < 20; i++) {
        const cx = (i * 30 - co) % (W + 60) - 30;
        const ch = 15 + (i * 7 % 20);
        ctx.fillRect(Math.round(cx), GROUND_Y - ch - 8, 18, ch + 8);
      }

      // Ground
      ctx.fillStyle = '#2a2a3e'; ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
      ctx.fillStyle = '#ff3ea5'; ctx.fillRect(0, GROUND_Y, W, 2);
      ctx.fillStyle = 'rgba(255,62,165,0.15)';
      for (let i = 0; i < W / 8 + 2; i++) {
        const gx = i * 8 - (Math.floor(groundOffsetRef.current) % 8);
        if (i % 2 === 0) ctx.fillRect(gx, GROUND_Y + 4, 8, 4);
        if (i % 3 === 0) ctx.fillRect(gx, GROUND_Y + 12, 8, 4);
      }

      obstaclesRef.current.forEach((o) => drawObstacle(ctx, o));
      drawPlayer(ctx);

      // Scanlines
      for (let i = 0; i < H; i += 3) { ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(0, i, W, 1); }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, gameOver, bestScore, drawPlayer, drawObstacle, spawnObstacle, px, onScoreChange, onGameStateChange]);

  // Cleanup
  useEffect(() => {
    return () => { gameActiveRef.current = false; cancelAnimationFrame(animRef.current); stopBgm(); };
  }, []);

  const handlePointerJump = useCallback(() => {
    if (!running && !gameOver) { resetGame(); return; }
    if (gameOver) { resetGame(); return; }
    jumpHeldRef.current = true;
    setTimeout(() => { jumpHeldRef.current = false; }, 150);
  }, [running, gameOver, resetGame]);

  return (
    <div className="flex flex-col items-center gap-3 w-full h-full">
      <div
        className="relative select-none w-full h-full"
        style={{ background: '#1a1a2e' }}
        onPointerDown={handlePointerJump}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="pixel-render block w-full h-full"
          style={{ touchAction: 'none', imageRendering: 'pixelated' }}
        />

        {!running && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
            <p className="text-pink font-pixel text-[8px] mb-1 text-center">PIXEL RUNNER</p>
            <p className="text-white font-pixel text-[6px] mb-1 text-center leading-relaxed">JUMP OVER OBSTACLES</p>
            <p className="text-white/40 font-mono text-[8px] mb-3 text-center">Press SPACE or Tap</p>
            <button
              onClick={(e) => { e.stopPropagation(); resetGame(); }}
              className="bg-pink text-white font-pixel text-[8px] px-5 py-2.5 hover:bg-yellow hover:text-black transition-all pixel-shadow active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              ▶ START
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
            <p className="text-pink font-pixel text-[10px] mb-1">GAME OVER</p>
            <p className="text-yellow font-pixel text-[8px] mb-1">SCORE: {score}</p>
            {bestScore > 0 && <p className="text-white/40 font-pixel text-[7px] mb-3">BEST: {bestScore}</p>}
            <button
              onClick={(e) => { e.stopPropagation(); resetGame(); }}
              className="bg-pixel-green text-black font-pixel text-[8px] px-5 py-2.5 hover:bg-yellow transition-all pixel-shadow active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              ▶ RETRY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
