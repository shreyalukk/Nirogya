'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SyringeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function Syringe({
  position = [1.9, -0.9, 0.8],
  rotation = [-0.3, 0.8, -0.5],
  scale = 0.9,
}: SyringeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.1 + 2.0) * 0.07;
    groupRef.current.rotation.z = rotation[2] + Math.cos(t * 0.7) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Transparent Acrylic Barrel */}
      <mesh castShadow>
        <cylinderGeometry args={[0.13, 0.13, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.65}
          roughness={0.1}
          metalness={0.05}
          clearcoat={1.0}
          transmission={0.7}
        />
      </mesh>

      {/* Graduation Marks (Subtle measurement lines) */}
      {[-0.3, -0.1, 0.1, 0.3].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.132, 0.006, 8, 24]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* Inner Fluid Column (Teal/Cyan medicine solution) */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.115, 0.115, 0.6, 24]} />
        <meshPhysicalMaterial
          color="#159b8a"
          transparent
          opacity={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Black Rubber Plunger Stopper */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>

      {/* White Plunger Rod extending out back */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Plunger Thumb Press Flange */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>

      {/* Finger Grip Flange at Barrel Top */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>

      {/* Front Luer Lock Hub */}
      <mesh position={[0, -0.66, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.12, 16]} />
        <meshStandardMaterial color="#0284c7" metalness={0.2} roughness={0.2} />
      </mesh>

      {/* Stainless Steel Needle Cannula */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.65, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.08} />
      </mesh>
    </group>
  );
}
