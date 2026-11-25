'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CapsuleProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
  bobOffset?: number;
}

export default function Capsule({
  position,
  rotation = [0.4, 0.6, 0.2],
  scale = 1,
  primaryColor = '#159b8a', // Teal
  secondaryColor = '#ffffff', // White
  speed = 1,
  bobOffset = 0,
}: CapsuleProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + bobOffset;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.12;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.7) * 0.15;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.9) * 0.2;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Top Half of Capsule */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 32]} />
        <meshPhysicalMaterial
          color={primaryColor}
          roughness={0.12}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color={primaryColor}
          roughness={0.12}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Center Band Line */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.224, 0.224, 0.02, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Bottom Half of Capsule */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 32]} />
        <meshPhysicalMaterial
          color={secondaryColor}
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.85}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color={secondaryColor}
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.85}
          clearcoatRoughness={0.12}
        />
      </mesh>
    </group>
  );
}
