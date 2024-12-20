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
  return (
    <main className="min-h-screen p-2 sm:p-4">
      <RankingsChartWrapper />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper />
    </Suspense>
  );
}

function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const searchParams = useSearchParams();
  return (
    <SearchParamsWrapper />
  );
}
