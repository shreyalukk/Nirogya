'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FirstAidBoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function FirstAidBox({
  position = [0, 0, 0],
  rotation = [0, -0.2, 0],
  scale = 1,
}: FirstAidBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.08;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.05;
    groupRef.current.rotation.x = rotation[0] + Math.cos(t * 0.6) * 0.03;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Box Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.7, 1.1]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
          reflectivity={0.9}
        />
      </mesh>

      {/* Box Lid / Split Seam Groove */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.22, 0.04, 1.12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Front Face Emblem Plate (Recessed white circle) */}
      <mesh position={[0, 0, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.02, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Medical Cross - Vertical Bar */}
      <mesh position={[0, 0, 0.58]}>
        <boxGeometry args={[0.16, 0.54, 0.04]} />
        <meshStandardMaterial
          color="#159b8a"
          roughness={0.2}
          metalness={0.1}
          emissive="#0d6358"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Medical Cross - Horizontal Bar */}
      <mesh position={[0, 0, 0.58]}>
        <boxGeometry args={[0.54, 0.16, 0.04]} />
        <meshStandardMaterial
          color="#159b8a"
          roughness={0.2}
          metalness={0.1}
          emissive="#0d6358"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Front Metallic Latches (Left & Right) */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={i} position={[x, 0, 0.56]}>
          <mesh>
            <boxGeometry args={[0.14, 0.22, 0.04]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.06, 0.02]}>
            <boxGeometry args={[0.1, 0.08, 0.03]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Top Handle - Left Bracket */}
      <mesh position={[-0.45, 0.9, 0]}>
        <boxGeometry args={[0.08, 0.14, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Top Handle - Right Bracket */}
      <mesh position={[0.45, 0.9, 0]}>
        <boxGeometry args={[0.08, 0.14, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Top Handle - Curved Arch Grip */}
      <mesh ref={handleRef} position={[0, 1.05, 0]}>
        <torusGeometry args={[0.45, 0.07, 16, 32, Math.PI]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
        />
      </mesh>

      {/* Corner Protectors (Soft rounded metallic corners) */}
      {[
        [-1.08, -0.82, 0.53],
        [1.08, -0.82, 0.53],
        [-1.08, 0.82, 0.53],
        [1.08, 0.82, 0.53],
        [-1.08, -0.82, -0.53],
        [1.08, -0.82, -0.53],
        [-1.08, 0.82, -0.53],
        [1.08, 0.82, -0.53],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}
