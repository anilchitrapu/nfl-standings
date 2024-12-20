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
    <Suspense fallback={<div>Loading...</div>}>
      <RankingsChartWrapper />
    </Suspense>
  );
}
