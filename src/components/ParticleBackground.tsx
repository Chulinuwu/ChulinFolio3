'use client';

import dynamic from 'next/dynamic';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <ParticleCanvas particleCount={40} />
    </div>
  );
}
