"use client";

import { Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import RankingsChart from '../RankingsChart';
import type { NFLPowerRanking } from '@/lib/process-rankings';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4">{message}</div>
    </div>
  );
}

function RankingsChartContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: rankings, error } = useSWR<NFLPowerRanking[]>('/api/rankings', fetcher);

  if (error) {
    return <div>Error loading rankings data</div>;
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

export default function RankingsChartWrapper() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RankingsChartContent />
    </Suspense>
  );
} 