"use client";

import useSWR from 'swr';
import RankingsChart from '@/src/components/RankingsChart';
import { NFLPowerRanking } from '@/src/lib/process-rankings';
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

export default function HomePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Fetch data with optimized SWR config
  const { data: rankings, error } = useSWR<NFLPowerRanking[]>(
    '/api/nfl-rankings',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000, // 5 minutes
      keepPreviousData: true,
      dedupingInterval: 60000,
    }
  );

  // Early return for error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4 text-red-500">
          Failed to load rankings
        </div>
      </div>
    );
  }

  // Show loading state if no data
  if (!rankings) {
    return <LoadingState message="Loading rankings data..." />;
  }

  return (
    <main className="min-h-screen p-2 sm:p-4">
      <RankingsChart
        teamsData={rankings}
        initialQuery={searchParams.toString()}
        pathname={pathname}
      />
    </main>
  );
}
