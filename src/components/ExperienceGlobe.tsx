'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface GlobeProps {
  activeIndex: number;
  progress: number;
}

const EARTH_TEXTURE = 'https://unpkg.com/three-globe@2.41.12/example/img/earth-blue-marble.jpg';
const EARTH_BUMP = 'https://unpkg.com/three-globe@2.41.12/example/img/earth-topology.png';

// Slightly different coordinates per experience for visual variety
const LOCATIONS = [
  { lat: 13.7262, lng: 100.5237 },  // BBL - Silom
  { lat: 13.7213, lng: 100.5292 },  // Aiful - Sathorn
  { lat: 13.7999, lng: 100.5533 },  // SCB - Chatuchak
  { lat: 13.7563, lng: 100.5018 },  // Freelance - central BKK
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function EarthSphere({ activeIndex, progress }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pinGroupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0.3, y: 0 });

  const [earthMap, bumpMap] = useLoader(TextureLoader, [EARTH_TEXTURE, EARTH_BUMP]);

  const pinPositions = useMemo(
    () => LOCATIONS.map((loc) => latLngToVec3(loc.lat, loc.lng, 1.85)),
    []
  );
  const pinPosition = pinPositions[activeIndex % pinPositions.length];

  // Viewing angles focused on Thailand/Bangkok (lng ~100.5E)
  // Calibrated: -3.35 rad centers Bangkok on camera
  const viewAngles = useMemo(() => [
    { y: -3.35, x: 0.18 },  // BBL - Bangkok centered
    { y: -3.25, x: 0.14 },  // Aiful - slight shift east
    { y: -3.45, x: 0.22 },  // SCB - slight shift west
    { y: -3.15, x: 0.10 },  // Freelance - wider SEA view
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const target = viewAngles[activeIndex % viewAngles.length];
    targetRotation.current.y += (target.y - targetRotation.current.y) * 0.015;
    targetRotation.current.x += (target.x - targetRotation.current.x) * 0.015;

    groupRef.current.rotation.y = targetRotation.current.y + Math.sin(t * 0.15) * 0.05;
    groupRef.current.rotation.x = targetRotation.current.x;

    // Pin pulse
    if (pinRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.3;
      pinRef.current.scale.setScalar(pulse);
    }

    // Ring expand
    if (ringRef.current) {
      const ringScale = 1 + ((t * 0.6) % 1) * 3;
      ringRef.current.scale.setScalar(ringScale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - ((t * 0.6) % 1));
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere with real texture */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          bumpMap={bumpMap}
          bumpScale={0.03}
          roughness={0.5}
          metalness={0.05}
          emissive="#2d1b69"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.04}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere ring */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Location pin - just a glowing dot on the surface */}
      <group position={pinPosition}>
        {/* Core dot */}
        <mesh ref={pinRef}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ff69b4" toneMapped={false} />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Pulse ring */}
        <mesh ref={ringRef} quaternion={new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          pinPosition.clone().normalize()
        )}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshBasicMaterial
            color="#f472b6"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// Ambient particles
function GlobeParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#f472b6"
        size={0.015}
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlobeScene({ activeIndex, progress }: GlobeProps) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#fce7f3" />
      <pointLight position={[-3, 2, 4]} intensity={2} color="#ec4899" distance={15} decay={2} />
      <pointLight position={[2, -2, 3]} intensity={1.2} color="#a855f7" distance={12} decay={2} />
      <pointLight position={[0, 3, 2]} intensity={1} color="#f9a8d4" distance={10} decay={2} />
      <Suspense fallback={null}>
        <EarthSphere activeIndex={activeIndex} progress={progress} />
      </Suspense>
      <GlobeParticles />
    </>
  );
}

export default function ExperienceGlobe({ activeIndex, progress }: GlobeProps) {
  return (
    <Canvas
      camera={{ position: [0, -0.2, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <GlobeScene activeIndex={activeIndex} progress={progress} />
    </Canvas>
  );
}
