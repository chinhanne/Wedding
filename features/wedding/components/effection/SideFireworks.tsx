'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

type FireworkSide = 'left' | 'right';

type FireworkParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: string;
};

type FireworkBurst = {
  id: number;
  side: FireworkSide;
  top: number;
  particles: FireworkParticle[];
};

type SideFireworksProps = {
  active?: boolean;
  intervalMs?: number;
};

type FireworkParticleStyle = CSSProperties & {
  '--x': string;
  '--y': string;
  '--size': string;
  '--duration': string;
};

type MobileSparkleStyle = CSSProperties & {
  '--size': string;
  '--duration': string;
  '--delay': string;
  '--move-x': string;
};

const FIREWORK_LIFETIME_MS = 2400;
const PARTICLE_COUNT = 42;

const FIREWORK_COLORS = [
  '#ff1744',
  '#ff2d95',
  '#ff9100',
  '#ffd600',
  '#ffffff',
];

const MOBILE_SPARKLE_COLORS = [
  '#fda4af',
  '#fecdd3',
  '#f9a8d4',
  '#fde68a',
  '#bbf7d0',
  '#ffffff',
];

const MOBILE_SPARKLES = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${6 + Math.random() * 88}%`,
  top: `${10 + Math.random() * 82}%`,
  size: `${4 + Math.random() * 4}px`,
  duration: `${3.2 + Math.random() * 2.4}s`,
  delay: `${Math.random() * 2.5}s`,
  moveX: `${-18 + Math.random() * 36}px`,
  color: MOBILE_SPARKLE_COLORS[index % MOBILE_SPARKLE_COLORS.length],
}));

function createParticles(): FireworkParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 150;

    return {
      id: index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 4 + Math.random() * 5,
      duration: 1100 + Math.random() * 700,
      color: FIREWORK_COLORS[index % FIREWORK_COLORS.length],
    };
  });
}

export function SideFireworks({
  active = true,
  intervalMs = 3500,
}: SideFireworksProps) {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const timeoutIds: number[] = [];

    const createBurst = (side: FireworkSide): FireworkBurst => ({
      id: nextIdRef.current++,
      side,
      top: 18 + Math.random() * 64,
      particles: createParticles(),
    });

    const fire = () => {
      const leftBurst = createBurst('left');
      const rightBurst = createBurst('right');

      setBursts((currentBursts) => [
        ...currentBursts,
        leftBurst,
        rightBurst,
      ]);

      const timeoutId = window.setTimeout(() => {
        setBursts((currentBursts) =>
          currentBursts.filter(
            (burst) => burst.id !== leftBurst.id && burst.id !== rightBurst.id
          )
        );
      }, FIREWORK_LIFETIME_MS);

      timeoutIds.push(timeoutId);
    };

    const firstTimeoutId = window.setTimeout(fire, 800);
    const intervalId = window.setInterval(fire, intervalMs);

    timeoutIds.push(firstTimeoutId);

    return () => {
      window.clearInterval(intervalId);

      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [active, intervalMs]);

  if (!active) return null;

  return (
    <div className="side-fireworks-layer" aria-hidden="true">
      <div className="side-fireworks-zone side-fireworks-zone-left">
        {bursts
          .filter((burst) => burst.side === 'left')
          .map((burst) => (
            <Firework key={burst.id} burst={burst} />
          ))}
      </div>

      <div className="side-fireworks-zone side-fireworks-zone-right">
        {bursts
          .filter((burst) => burst.side === 'right')
          .map((burst) => (
            <Firework key={burst.id} burst={burst} />
          ))}
      </div>

      <div className="mobile-sparkle-field">
        {MOBILE_SPARKLES.map((sparkle) => {
          const sparkleStyle: MobileSparkleStyle = {
            left: sparkle.left,
            top: sparkle.top,
            color: sparkle.color,
            '--size': sparkle.size,
            '--duration': sparkle.duration,
            '--delay': sparkle.delay,
            '--move-x': sparkle.moveX,
          };

          return (
            <span
              key={sparkle.id}
              className="mobile-sparkle"
              style={sparkleStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

function Firework({ burst }: { burst: FireworkBurst }) {
  const isLeft = burst.side === 'left';

  return (
    <div
      className={`side-firework-burst ${
        isLeft ? 'side-firework-burst-left' : 'side-firework-burst-right'
      }`}
      style={{ top: `${burst.top}%` }}
    >
      <span
        className={`side-firework-rocket ${
          isLeft ? 'side-firework-rocket-left' : 'side-firework-rocket-right'
        }`}
      />

      <span className="side-firework-core" />

      {burst.particles.map((particle) => {
        const particleStyle: FireworkParticleStyle = {
          '--x': `${particle.x}px`,
          '--y': `${particle.y}px`,
          '--size': `${particle.size}px`,
          '--duration': `${particle.duration}ms`,
          color: particle.color,
        };

        return (
          <span
            key={particle.id}
            className="side-firework-particle"
            style={particleStyle}
          />
        );
      })}
    </div>
  );
}