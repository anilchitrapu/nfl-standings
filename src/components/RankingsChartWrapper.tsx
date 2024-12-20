"use client";

import { useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import RankingsChart from './RankingsChart';
import type { NFLPowerRanking } from '@/lib/process-rankings';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4">{message}</div>
    </div>
  );
}

export default function RankingsChartWrapper() {
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