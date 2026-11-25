'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MedicalParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = [
    { pos: [-2.6, 1.4, -0.6], scale: 0.16, color: '#159b8a', speed: 0.8 },
    { pos: [2.5, 0.4, -0.8], scale: 0.14, color: '#ffffff', speed: 1.1 },
    { pos: [-1.4, -1.6, 0.2], scale: 0.12, color: '#0d9488', speed: 0.9 },
    { pos: [1.3, 1.9, -0.5], scale: 0.15, color: '#a5f3fc', speed: 1.2 },
    { pos: [-0.3, 1.8, -1.0], scale: 0.11, color: '#ffffff', speed: 0.7 },
    { pos: [2.8, -1.2, 0.1], scale: 0.13, color: '#14b8a6', speed: 1.0 },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;
      child.position.y = p.pos[1] + Math.sin(t * p.speed + i) * 0.12;
      child.rotation.z = Math.sin(t * 0.4 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <group key={idx} position={p.pos as [number, number, number]} scale={p.scale}>
          {/* Vertical bar of 3D Plus */}
          <mesh>
            <boxGeometry args={[0.3, 1, 0.25]} />
            <meshStandardMaterial
              color={p.color}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Horizontal bar of 3D Plus */}
          <mesh>
            <boxGeometry args={[1, 0.3, 0.25]} />
            <meshStandardMaterial
              color={p.color}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Floating soft glowing pearl spheres */}
      {[
        [-1.8, 0.8, -0.4],
        [2.1, 1.6, 0.2],
        [-0.8, -1.2, 0.9],
        [1.6, -1.4, -0.3],
      ].map((pos, i) => (
        <mesh key={`orb-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            clearcoat={1.0}
            emissive="#e0f2fe"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
