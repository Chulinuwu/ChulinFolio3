'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

const COLORS = ['#ec4899', '#a855f7'];
const MOUSE_RADIUS = 150;
const CONNECT_RADIUS = 100;
const FRAME_INTERVAL = 1000 / 30;

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.1,
    vy: (Math.random() - 0.5) * 0.1,
    radius: 1 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.1 + Math.random() * 0.4,
  };
}

export default function ParticleCanvas({
  className = '',
  particleCount = 120,
  interactive = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(w, h));
  }, [particleCount]);

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
    for (const p of particlesRef.current) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    init();

    if (prefersReduced) {
      drawStatic();
      const onResize = () => {
        init();
        drawStatic();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onResize = () => {
      cancelAnimationFrame(animFrameRef.current);
      init();
      lastTimeRef.current = 0;
      loop(0);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    function loop(timestamp: number) {
      animFrameRef.current = requestAnimationFrame(loop);
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const dpr = dprRef.current;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx!.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (const p of particles) {
        if (interactive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        const baseSpeed = 0.12;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > baseSpeed * 4) {
          p.vx = (p.vx / speed) * baseSpeed * 4;
          p.vy = (p.vy / speed) * baseSpeed * 4;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_RADIUS) {
            const alpha = 0.03 + (1 - dist / CONNECT_RADIUS) * 0.05;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.opacity;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [init, drawStatic, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
