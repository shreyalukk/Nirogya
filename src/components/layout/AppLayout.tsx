'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import DemoBanner from '../common/DemoBanner';
import { RoleProvider } from '../common/RoleContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If on the public 3D landing page (root '/'), render clean without dashboard sidebar
  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <RoleProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Persistent Demo Warning Banner */}
        <DemoBanner />

        <div className="flex flex-1">
          {/* Responsive Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content Area */}
          <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
            {/* Header */}
            <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            {/* Page Viewport */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
}
