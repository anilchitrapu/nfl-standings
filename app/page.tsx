"use client";

import { Suspense } from 'react';
import useSWR from 'swr';
import RankingsChart from '@/components/RankingsChart';
import { NFLPowerRanking } from '@/lib/process-rankings';
import { useSearchParams, usePathname } from 'next/navigation';

// Move fetcher outside component
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Move NFL week calculation outside component
const getCurrentNFLWeek = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const seasonStart = new Date(currentYear, 8, 7); // September 7th
  
  if (now < seasonStart) {
    return 18; // Return last week of previous season
  }
  
  const weeksPassed = Math.floor(
    (now.getTime() - seasonStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  
  return Math.max(1, Math.min(18, weeksPassed + 1));
};

// Loading component
function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4">{message}</div>
    </div>
  );
}

// Wrap the chart component that uses search params
function RankingsChartWrapper() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const { data: rankings, error } = useSWR<NFLPowerRanking[]>(
    '/api/nfl-rankings',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000,
      keepPreviousData: true,
      dedupingInterval: 60000,
    }
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4 text-red-500">
          Failed to load rankings
        </div>
      </div>
    );
  }

  if (!rankings) {
    return <LoadingState message="Loading rankings data..." />;
  }

  return (
    <RankingsChart
      teamsData={rankings}
      initialQuery={searchParams.toString()}
      pathname={pathname}
    />
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen p-2 sm:p-4">
      <Suspense fallback={<LoadingState />}>
        <RankingsChartWrapper />
      </Suspense>
    </main>
  );
}
