'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shared color palette
const PINK = new THREE.Color('#ec4899');
const PURPLE = new THREE.Color('#a855f7');
const HOT_PINK = new THREE.Color('#f472b6');
const SOFT_PINK = new THREE.Color('#fce7f3');

// Neural network node with pulsing glow
function NeuralCluster() {
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodes = useMemo(() => {
    const arr: { pos: THREE.Vector3; basePos: THREE.Vector3; phase: number; speed: number; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      // Distribute in a loose spherical cluster with density falloff
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.6) * 3.5;
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7, // Slightly flattened
        r * Math.cos(phi)
      );
      arr.push({
        pos: pos.clone(),
        basePos: pos.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        size: 0.015 + Math.random() * 0.025,
      });
    }
    return arr;
  }, []);

  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const color = t > 0.6 ? PINK : t > 0.3 ? PURPLE : HOT_PINK;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (!nodesRef.current || !glowRef.current) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      // Organic drift
      node.pos.x = node.basePos.x + Math.sin(t * node.speed + node.phase) * 0.15;
      node.pos.y = node.basePos.y + Math.cos(t * node.speed * 0.7 + node.phase) * 0.12;
      node.pos.z = node.basePos.z + Math.sin(t * node.speed * 0.5 + node.phase * 2) * 0.1;

      const pulse = 1 + Math.sin(t * 2 + node.phase) * 0.3;
      const s = node.size * pulse;

      dummy.position.copy(node.pos);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);

      // Glow sphere (larger, more transparent)
      dummy.scale.setScalar(s * 3);
      dummy.updateMatrix();
      glowRef.current.setMatrixAt(i, dummy.matrix);
    }

    nodesRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#f472b6" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  );
}

// Dynamic connections between nearby nodes that form and dissolve
function SynapticConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const nodeCount = 80;
  const maxConnections = nodeCount * 6;

  const positions = useMemo(() => new Float32Array(maxConnections * 6), []);
  const colors = useMemo(() => new Float32Array(maxConnections * 6), []);

  // Access neural cluster node positions via shared ref
  const nodesData = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.6) * 3.5;
      arr.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      ));
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    let idx = 0;
    const maxDist = 1.2;

    // Update node positions with same drift as NeuralCluster
    for (let i = 0; i < nodeCount; i++) {
      const phase = i * 0.73;
      const speed = 0.3 + (i % 7) * 0.1;
      nodesData[i].x += Math.sin(t * speed + phase) * 0.001;
      nodesData[i].y += Math.cos(t * speed * 0.7 + phase) * 0.001;
    }

    for (let i = 0; i < nodeCount && idx < maxConnections; i++) {
      for (let j = i + 1; j < nodeCount && idx < maxConnections; j++) {
        const d = nodesData[i].distanceTo(nodesData[j]);
        if (d < maxDist) {
          const alpha = 1 - d / maxDist;
          // Flickering connection visibility
          const flicker = Math.sin(t * 3 + i * 0.5 + j * 0.3) * 0.5 + 0.5;
          const finalAlpha = alpha * flicker;

          const pi = idx * 6;
          positions[pi] = nodesData[i].x;
          positions[pi + 1] = nodesData[i].y;
          positions[pi + 2] = nodesData[i].z;
          positions[pi + 3] = nodesData[j].x;
          positions[pi + 4] = nodesData[j].y;
          positions[pi + 5] = nodesData[j].z;

          // Color gradient along connection
          const c = finalAlpha > 0.5 ? PINK : PURPLE;
          colors[pi] = c.r * finalAlpha;
          colors[pi + 1] = c.g * finalAlpha;
          colors[pi + 2] = c.b * finalAlpha;
          colors[pi + 3] = c.r * finalAlpha * 0.5;
          colors[pi + 4] = c.g * finalAlpha * 0.5;
          colors[pi + 5] = c.b * finalAlpha * 0.5;

          idx++;
        }
      }
    }

    // Zero remaining
    for (let i = idx * 6; i < maxConnections * 6; i++) {
      positions[i] = 0;
      colors[i] = 0;
    }

    const geo = lineRef.current.geometry;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    geo.setDrawRange(0, idx * 2);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// Energy pulses that travel along paths (synaptic firing)
function EnergyPulses() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const pulseCount = 20;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pulses = useMemo(() => {
    return Array.from({ length: pulseCount }, () => {
      const startTheta = Math.random() * Math.PI * 2;
      const startPhi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * 2.5;
      return {
        start: new THREE.Vector3(
          r * Math.sin(startPhi) * Math.cos(startTheta),
          r * Math.sin(startPhi) * Math.sin(startTheta) * 0.7,
          r * Math.cos(startPhi)
        ),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 4
        ),
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.6,
        size: 0.02 + Math.random() * 0.03,
      };
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < pulseCount; i++) {
      const pulse = pulses[i];
      pulse.progress += pulse.speed * 0.008;
      if (pulse.progress > 1) {
        pulse.progress = 0;
        // New random path
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1 + Math.random() * 2.5;
        pulse.start.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi)
        );
        pulse.end.set(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 4
        );
      }

      const p = pulse.progress;
      // Ease in-out for organic movement
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      dummy.position.lerpVectors(pulse.start, pulse.end, eased);
      // Pulse size peaks in the middle of travel
      const sizeMod = Math.sin(p * Math.PI) * 1.5 + 0.5;
      dummy.scale.setScalar(pulse.size * sizeMod);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, pulseCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#fce7f3"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// DNA-like double helix wrapping the cluster
function DataHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const strand1Ref = useRef<THREE.Points>(null);
  const strand2Ref = useRef<THREE.Points>(null);
  const rungs = useRef<THREE.LineSegments>(null);

  const pointCount = 120;
  const helixRadius = 2.2;
  const helixHeight = 6;
  const turns = 2.5;

  const { strand1Pos, strand2Pos, rungPositions } = useMemo(() => {
    const s1 = new Float32Array(pointCount * 3);
    const s2 = new Float32Array(pointCount * 3);
    const rp = new Float32Array(pointCount * 6);

    for (let i = 0; i < pointCount; i++) {
      const t = i / pointCount;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * helixHeight;

      s1[i * 3] = Math.cos(angle) * helixRadius;
      s1[i * 3 + 1] = y;
      s1[i * 3 + 2] = Math.sin(angle) * helixRadius;

      s2[i * 3] = Math.cos(angle + Math.PI) * helixRadius;
      s2[i * 3 + 1] = y;
      s2[i * 3 + 2] = Math.sin(angle + Math.PI) * helixRadius;

      // Rungs connecting the two strands (every 4th point)
      if (i % 4 === 0) {
        const ri = (i / 4) * 6;
        rp[ri] = s1[i * 3];
        rp[ri + 1] = s1[i * 3 + 1];
        rp[ri + 2] = s1[i * 3 + 2];
        rp[ri + 3] = s2[i * 3];
        rp[ri + 4] = s2[i * 3 + 1];
        rp[ri + 5] = s2[i * 3 + 2];
      }
    }

    return { strand1Pos: s1, strand2Pos: s2, rungPositions: rp };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points ref={strand1Ref}>
        <bufferGeometry>
          <bufferAttribute args={[strand1Pos, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          color="#ec4899"
          size={0.04}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <points ref={strand2Ref}>
        <bufferGeometry>
          <bufferAttribute args={[strand2Pos, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          color="#a855f7"
          size={0.04}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={rungs}>
        <bufferGeometry>
          <bufferAttribute args={[rungPositions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <lineBasicMaterial
          color="#f9a8d4"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Ambient floating dust/stars for depth
function AmbientDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const { positions, sizes } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return { positions: p, sizes: s };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#f9a8d4"
        size={0.025}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Mouse-reactive camera
function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.5 - target.current.x) * 0.02;
    target.current.y += (mouse.current.y * 0.3 - target.current.y) * 0.02;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <MouseCamera />
      <NeuralCluster />
      <SynapticConnections />
      <EnergyPulses />
      <DataHelix />
      <AmbientDust />
    </>
  );
}

export default function HeroScene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
