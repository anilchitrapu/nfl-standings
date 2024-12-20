"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

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

function SearchParamsWrapper() {
  const searchParams = useSearchParams()
  // ... existing search params logic ...
  return (
    // ... existing JSX that uses searchParams ...
  )
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>
    </main>
  );
}
