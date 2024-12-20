// ... existing code (if any) ...

let cachedData: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchEspnNflData(): Promise<any> {
  if (cachedData && (Date.now() - lastFetchTime) < CACHE_DURATION) {
    return cachedData;
  }

  // Regular season 2024 typically starts early September and ends early January
  const url = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=20240901-20250215';
  
  console.log('Fetching NFL data from:', url);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`ESPN API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Log data structure for debugging
    console.log('ESPN data structure:', {
      hasEvents: !!data.events,
      eventCount: data.events?.length,
      hasLeagues: !!data.leagues,
      leagueCount: data.leagues?.length,
      seasonType: data.events?.[0]?.season?.type,
      firstEventDate: data.events?.[0]?.date,
      lastEventDate: data.events?.[data.events?.length - 1]?.date
    });

    cachedData = data;
    lastFetchTime = Date.now();
    return data;
  } catch (error) {
    if (cachedData) {
      console.warn('Failed to fetch fresh data, using cached data:', error);
      return cachedData;
    }
    throw error;
  }
}
// ... existing code (if any) ... 