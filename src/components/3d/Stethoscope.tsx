'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StethoscopeProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Stethoscope({
  position = [0, 0, 0],
  scale = 1,
}: StethoscopeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bellRef = useRef<THREE.Group>(null);

  // Generate smooth 3D spline curve for the stethoscope rubber tubing
  const tubeGeometry = useMemo(() => {
    const curvePoints = [
      new THREE.Vector3(0.9, 1.4, 0.3),    // Right earpiece junction
      new THREE.Vector3(0.5, 1.0, 0.4),
      new THREE.Vector3(0.2, 0.4, 0.8),    // Y-connector
      new THREE.Vector3(-0.3, 0.1, 1.1),
      new THREE.Vector3(-1.1, -0.2, 0.9),  // Loop down around box left
      new THREE.Vector3(-1.6, -0.7, 0.3),
      new THREE.Vector3(-1.3, -1.2, -0.4), // Underneath box
      new THREE.Vector3(-0.4, -1.3, -0.6),
      new THREE.Vector3(0.6, -1.1, -0.2),  // Loops up around right back
      new THREE.Vector3(1.4, -0.8, 0.4),
      new THREE.Vector3(1.6, -0.4, 1.0),
      new THREE.Vector3(1.2, -0.2, 1.3),   // Coming to foreground
      new THREE.Vector3(0.8, 0.1, 1.4),    // Attaching to chest piece
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    return new THREE.TubeGeometry(curve, 100, 0.045, 16, false);
  }, []);

  // Left binaural tube
  const leftBinauralGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 1.8, 0.1),
      new THREE.Vector3(-0.5, 1.3, 0.2),
      new THREE.Vector3(0.2, 0.4, 0.8),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.038, 12, false);
  }, []);

  // Right binaural tube
  const rightBinauralGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.7, 1.9, 0.15),
      new THREE.Vector3(0.6, 1.4, 0.25),
      new THREE.Vector3(0.2, 0.4, 0.8),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.038, 12, false);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Floating and gentle breathing motion
    groupRef.current.position.y = position[1] + Math.sin(t * 1.1 + 0.5) * 0.06;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;

    // Gentle chestpiece bobbing
    if (bellRef.current) {
      bellRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
      bellRef.current.rotation.z = Math.cos(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main Flexible Rubber Tubing */}
      <mesh geometry={tubeGeometry} castShadow>
        <meshStandardMaterial
          color="#172c48"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Chrome Binaural Metal Arch - Left */}
      <mesh geometry={leftBinauralGeo}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.92} roughness={0.12} />
      </mesh>

      {/* Chrome Binaural Metal Arch - Right */}
      <mesh geometry={rightBinauralGeo}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.92} roughness={0.12} />
      </mesh>

      {/* Earpieces (Left & Right soft tips) */}
      <mesh position={[-0.62, 1.83, 0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.72, 1.93, 0.15]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Chrome Y-Connector Ring */}
      <mesh position={[0.2, 0.4, 0.8]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Floating Stethoscope Chest Piece / Diaphragm */}
      <group ref={bellRef} position={[0.8, 0.1, 1.4]} rotation={[0.4, 0.6, -0.2]}>
        {/* Outer Metallic Rim */}
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.35, 0.1, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Diaphragm Face (Frosted Medical Teal Ring) */}
        <mesh position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.29, 0.29, 0.015, 32]} />
          <meshPhysicalMaterial
            color="#159b8a"
            roughness={0.15}
            clearcoat={0.9}
            metalness={0.2}
          />
        </mesh>

        {/* Inner Acoustic Central Dot */}
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Rear Bell (Small pediatric side) */}
        <mesh position={[0, -0.07, 0]}>
          <cylinderGeometry args={[0.2, 0.16, 0.08, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}
