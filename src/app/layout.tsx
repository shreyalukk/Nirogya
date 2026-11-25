import type { Metadata } from 'next';
import './globals.css';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'NIROGYA – Community Healthcare Camp Coordination & Continuity Platform',
  description: 'One camp. Every patient. Continuous care. Field-first health camp management, live queues, triage, and longitudinal care continuity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
