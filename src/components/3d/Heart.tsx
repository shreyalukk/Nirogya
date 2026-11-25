'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function Heart({
  position = [1.8, 1.2, 0.5],
  rotation = [0.2, -0.3, 0.1],
  scale = 1,
}: HeartProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !pulseGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(t * 1.3) * 0.09;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.12;
    groupRef.current.rotation.x = rotation[0] + Math.cos(t * 0.6) * 0.08;

    // Realistic anatomical "lub-dub" heartbeat pulse
    const beat = (t * 2.8) % (Math.PI * 2);
    let s = 1;
    if (beat < 0.35) {
      // First contraction (lub)
      s = 1 + Math.sin(beat * Math.PI / 0.35) * 0.14;
    } else if (beat >= 0.45 && beat < 0.75) {
      // Second quick contraction (dub)
      s = 1 + Math.sin((beat - 0.45) * Math.PI / 0.3) * 0.09;
    }
    pulseGroupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <group ref={pulseGroupRef}>
        {/* Left Ventricle Sphere */}
        <mesh position={[-0.2, 0.15, 0]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshPhysicalMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            emissive="#9f1239"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Right Ventricle Sphere */}
        <mesh position={[0.2, 0.15, 0]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshPhysicalMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            emissive="#9f1239"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Lower Heart Apex Cone */}
        <mesh position={[0, -0.22, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.48, 0.65, 32]} />
          <meshPhysicalMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            emissive="#9f1239"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Aorta Arch Tube (Subtle anatomical arch on top) */}
        <mesh position={[-0.05, 0.44, -0.05]} rotation={[0.2, 0.3, -0.4]}>
          <torusGeometry args={[0.16, 0.065, 16, 32, Math.PI * 0.8]} />
          <meshStandardMaterial
            color="#be123c"
            roughness={0.3}
            metalness={0.15}
          />
        </mesh>

        {/* Pulmonary Artery Tube */}
        <mesh position={[0.15, 0.42, 0.05]} rotation={[-0.1, -0.4, 0.5]}>
          <cylinderGeometry args={[0.06, 0.065, 0.22, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.15} />
        </mesh>
      </group>
    </group>
  );
}
