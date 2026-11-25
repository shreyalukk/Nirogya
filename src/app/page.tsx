import React from 'react';
import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eaf4ff] text-[#172c48] flex flex-col antialiased selection:bg-[#159b8a] selection:text-white">
      <LandingNav />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
      </main>
      <LandingFooter />
    </div>
  );
}
