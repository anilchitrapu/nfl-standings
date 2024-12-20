import { NextResponse } from 'next/server';
import { buildPowerRankingsOverTime } from '@/src/lib/process-rankings';
import { fetchEspnNflData } from '@/src/lib/espn-fetch';
import type { ESPNEvent } from '@/src/lib/process-rankings';

// Minimal types for calendar structure
interface ESPNCalendarEntry {
  data?: {
    events?: ESPNEvent[];
  };
}

interface ESPNCalendarWeek {
  entries?: ESPNCalendarEntry[];
}

interface ESPNLeague {
  calendar?: ESPNCalendarWeek[];
}

export async function GET(request: Request) {
  try {
    const data = await fetchEspnNflData();
    const allEvents: ESPNEvent[] = [];
    
    // Process top-level events
    if (data.events) {
      const validEvents = data.events.filter((ev: ESPNEvent) => {
        const isCompleted = ev.status?.type?.completed === true;
        const isRegularSeason = ev.season?.type === 2; // Regular season = type 2
        const isCurrentSeason = ev.season?.year === 2024; // Filter for 2024 season
        const hasValidCompetitors = ev.competitions?.[0]?.competitors?.length === 2;
        const isValidDate = new Date(ev.date) >= new Date('2024-09-01');
        
        return isCompleted && isRegularSeason && isCurrentSeason && 
               hasValidCompetitors && isValidDate;
      });
      
      console.log(`Found ${validEvents.length} valid regular season events`);
      allEvents.push(...validEvents);
    }

    // Process calendar events if present
    if (data.leagues) {
      data.leagues.forEach((league: ESPNLeague) => {
        if (league.calendar) {
          league.calendar.forEach(week => {
            week.entries?.forEach(entry => {
              const events = entry.data?.events || [];
              const validEvents = events.filter(ev => {
                const isCompleted = ev.status?.type?.completed === true;
                const isRegularSeason = ev.season?.type === 2;
                const isCurrentSeason = ev.season?.year === 2024;
                const hasValidCompetitors = ev.competitions?.[0]?.competitors?.length === 2;
                const isValidDate = new Date(ev.date) >= new Date('2024-09-01');
                
                return isCompleted && isRegularSeason && isCurrentSeason && 
                       hasValidCompetitors && isValidDate;
              });
              allEvents.push(...validEvents);
            });
          });
        }
      });
    }

    // Sort events chronologically
    allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    console.log('Events summary:', {
      total: allEvents.length,
      firstDate: allEvents[0]?.date,
      lastDate: allEvents[allEvents.length - 1]?.date,
      weekRange: `Week ${allEvents[0]?.week.number} to Week ${allEvents[allEvents.length - 1]?.week.number}`
    });

    const allRankings = await buildPowerRankingsOverTime(allEvents);
    
    // Log sample rankings for verification
    if (allRankings.length > 0) {
      const sample = allRankings[0];
      console.log('Sample team rankings:', {
        team: sample.teamName,
        weeks: sample.weeklyPowerRanks.length,
        latestRank: sample.weeklyPowerRanks[sample.weeklyPowerRanks.length - 1]
      });
    }

    return NextResponse.json(allRankings);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' }, 
      { status: 500 }
    );
  }
} 