import { NextResponse } from 'next/server';
import { fetchEspnNflData } from '@/src/lib/espn-fetch';
import { buildPowerRankingsOverTime } from '@/lib/process-rankings';
import type { ESPNResponse } from '@/src/services/apiService';

export async function GET() {
  try {
    const espnData = await fetchEspnNflData();
    if (!espnData || !espnData.events) {
      throw new Error('No data received from ESPN');
    }

    const allEvents = espnData.events;
    
    // Sort events chronologically
    allEvents.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log('Events summary:', {
      total: allEvents.length,
      firstDate: allEvents[0]?.date,
      lastDate: allEvents[allEvents.length - 1]?.date,
      weekRange: `Week ${allEvents[0]?.week.number} to Week ${allEvents[allEvents.length - 1]?.week.number}`
    });

    const allRankings = await buildPowerRankingsOverTime(allEvents);
    
    return NextResponse.json(allRankings);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' }, 
      { status: 500 }
    );
  }
} 