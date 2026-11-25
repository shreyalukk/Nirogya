'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MedicineBottleProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  bottleColor?: string;
}

export default function MedicineBottle({
  position = [-2.1, -0.6, 0.4],
  rotation = [0.2, 0.5, -0.15],
  scale = 1,
  bottleColor = '#0d9488', // Translucent teal glass
}: MedicineBottleProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 1.05 + 1.2) * 0.08;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.6) * 0.12;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Bottle Glass Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.36, 0.85, 32]} />
        <meshPhysicalMaterial
          color={bottleColor}
          transparent
          opacity={0.88}
          roughness={0.12}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transmission={0.4}
          ior={1.45}
        />
      </mesh>

      {/* Bottle Shoulder Curve */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.2, 0.34, 0.15, 32]} />
        <meshPhysicalMaterial
          color={bottleColor}
          transparent
          opacity={0.88}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* White Ridged Medicine Cap */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.1} />
      </mesh>

      {/* White Paper Label Wrapped Around Center */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.345, 0.365, 0.5, 32, 1, true, 0, Math.PI * 1.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Pill icon on label */}
      <mesh position={[0.37, 0, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.02, 0.12, 0.05]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>
    </group>
  );
}
