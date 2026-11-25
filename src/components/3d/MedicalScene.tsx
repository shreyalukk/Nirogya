'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import FirstAidBox from './FirstAidBox';
import Stethoscope from './Stethoscope';
import Capsule from './Capsule';
import Heart from './Heart';
import MedicineBottle from './MedicineBottle';
import Syringe from './Syringe';
import MedicalParticles from './MedicalParticles';

// Interactive Stage with Lerped Pointer Tracking & Parallax
function InteractiveStage({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const stageRef = useRef<THREE.Group>(null);
  const fgRef = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!stageRef.current) return;

    if (reducedMotion) {
      // Subtle gentle default angle without cursor tracking if reduced motion is requested
      stageRef.current.rotation.y = THREE.MathUtils.lerp(stageRef.current.rotation.y, 0, 0.05);
      stageRef.current.rotation.x = THREE.MathUtils.lerp(stageRef.current.rotation.x, 0, 0.05);
      return;
    }

    // Clamp pointer values
    const px = THREE.MathUtils.clamp(pointer.x, -1, 1);
    const py = THREE.MathUtils.clamp(pointer.y, -1, 1);

    // Subtle, elegant rotation limits (~10 degrees max)
    const targetRotY = px * 0.22;
    const targetRotX = -py * 0.16;

    // Smooth spring-like lerp interpolation
    stageRef.current.rotation.y = THREE.MathUtils.lerp(stageRef.current.rotation.y, targetRotY, 0.05);
    stageRef.current.rotation.x = THREE.MathUtils.lerp(stageRef.current.rotation.x, targetRotX, 0.05);

    // Parallax depth: Foreground shifts slightly opposite, background shifts in depth
    if (fgRef.current && bgRef.current) {
      fgRef.current.position.x = THREE.MathUtils.lerp(fgRef.current.position.x, px * 0.15, 0.06);
      fgRef.current.position.y = THREE.MathUtils.lerp(fgRef.current.position.y, py * 0.12, 0.06);

      bgRef.current.position.x = THREE.MathUtils.lerp(bgRef.current.position.x, -px * 0.08, 0.04);
      bgRef.current.position.y = THREE.MathUtils.lerp(bgRef.current.position.y, -py * 0.06, 0.04);
    }
  });

  return (
    <group ref={stageRef}>
      {/* Background Layer (Distant particles, rear pills) */}
      <group ref={bgRef}>
        <MedicalParticles />
        <Capsule
          position={[-2.4, 1.2, -1.0]}
          rotation={[0.3, 0.8, -0.4]}
          scale={0.7}
          primaryColor="#0f766e"
          secondaryColor="#f8fafc"
          speed={0.8}
          bobOffset={1.5}
        />
        <Capsule
          position={[2.3, -1.3, -0.8]}
          rotation={[-0.4, 0.5, 0.7]}
          scale={0.65}
          primaryColor="#e11d48"
          secondaryColor="#ffffff"
          speed={0.9}
          bobOffset={2.7}
        />
      </group>

      {/* Main Focus Layer: First Aid Box & Orbiting Stethoscope */}
      <group position={[0, -0.05, 0]}>
        <FirstAidBox position={[0, 0, 0]} rotation={[0.08, -0.18, 0.02]} scale={isMobile ? 0.85 : 1.05} />
        <Stethoscope position={[0, 0, 0]} scale={isMobile ? 0.85 : 1.05} />
      </group>

      {/* Mid & Foreground Layer: Heart, Medicine Bottles, Syringe, Floating Hero Capsules */}
      <group ref={fgRef}>
        {/* Pulsing 3D Anatomical-style Heart */}
        <Heart
          position={[isMobile ? 1.5 : 2.0, isMobile ? 1.0 : 1.3, 0.6]}
          rotation={[0.15, -0.35, 0.1]}
          scale={isMobile ? 0.75 : 0.95}
        />

        {/* Translucent Medicine Bottle */}
        <MedicineBottle
          position={[isMobile ? -1.7 : -2.3, isMobile ? -0.7 : -0.8, 0.5]}
          rotation={[0.18, 0.6, -0.2]}
          scale={isMobile ? 0.8 : 1.0}
        />

        {/* Detailed Medical Syringe */}
        <Syringe
          position={[isMobile ? 1.5 : 2.1, isMobile ? -1.0 : -1.1, 0.7]}
          rotation={[-0.25, 0.9, -0.45]}
          scale={isMobile ? 0.75 : 0.95}
        />

        {/* Foreground Hero Floating Capsule 1 (Teal & White) */}
        <Capsule
          position={[-1.7, 1.4, 0.8]}
          rotation={[0.6, 0.4, -0.3]}
          scale={0.85}
          primaryColor="#159b8a"
          secondaryColor="#ffffff"
          speed={1.1}
          bobOffset={0.2}
        />

        {/* Foreground Hero Floating Capsule 2 (Crimson Coral & White) */}
        <Capsule
          position={[0.2, -1.5, 1.1]}
          rotation={[-0.3, 1.1, 0.5]}
          scale={0.8}
          primaryColor="#e11d48"
          secondaryColor="#ffffff"
          speed={1.3}
          bobOffset={1.8}
        />

        {/* Foreground Floating Capsule 3 (Warm Amber & White) */}
        <Capsule
          position={[-0.9, -1.4, 0.7]}
          rotation={[0.5, -0.6, 0.2]}
          scale={0.75}
          primaryColor="#f59e0b"
          secondaryColor="#ffffff"
          speed={0.95}
          bobOffset={3.1}
        />
      </group>
    </group>
  );
}

// Fallback when WebGL is loading or unavailable
function WebGLFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#c2dcf9] via-[#e2eefc] to-[#f3f8fe] rounded-3xl border border-white/60 shadow-[0_20px_50px_rgba(23,44,72,0.08)]">
      <div className="w-24 h-24 rounded-3xl bg-white/80 shadow-lg border border-teal-200/50 flex items-center justify-center text-teal-700 animate-pulse mb-4">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <p className="font-bold text-[#172c48] text-lg">Interactive 3D Medical Scene</p>
      <p className="text-xs text-slate-600 mt-1 max-w-xs">Initializing high-fidelity 3D viewport with natural lighting...</p>
    </div>
  );
}

export default function MedicalScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Screen width detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // WebGL capability test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (!mounted || !hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] select-none touch-pan-y">
      {/* Soft Ambient Radial Glow Behind 3D Composition */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[320px] sm:w-[480px] lg:w-[580px] h-[320px] sm:h-[480px] lg:h-[580px] rounded-full bg-gradient-to-tr from-[#a9c9ee]/40 via-[#d1e5fc]/50 to-white/60 blur-3xl" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: isMobile ? 54 : 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Natural Studio Lighting for Soft Pastel Atmosphere */}
          <ambientLight intensity={1.1} color="#f0f7ff" />

          {/* Key Directional Light with Soft Highlights */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.8}
            color="#ffffff"
            castShadow
          />

          {/* Soft Fill Light from Lower-Left in Medical Sky Blue */}
          <directionalLight
            position={[-5, -2, 3]}
            intensity={0.8}
            color="#a9c9ee"
          />

          {/* Rim Light for Crisp Edge Highlights */}
          <pointLight
            position={[0, 4, -3]}
            intensity={1.4}
            color="#99f6e4"
          />

          {/* Interactive Responsive 3D Stage */}
          <InteractiveStage isMobile={isMobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
