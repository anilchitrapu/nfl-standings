"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the wrapper component dynamically to avoid SSR issues
const RankingsChartWrapper = dynamic(
  () => import('../src/components/RankingsChartWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">Loading rankings data...</div>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main className="min-h-screen p-2 sm:p-4">
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-4">Loading...</div>
          </div>
        }
      >
        <RankingsChartWrapper />
      </Suspense>
    </main>
  );
}
