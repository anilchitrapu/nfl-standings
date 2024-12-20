import { fetchEspnNflData } from './espn-fetch';
import { NFL_TEAM_DATA, NFL_TEAM_IDS } from './team-data';
import { Conference, Division } from '@/src/types/nfl';

// ESPN API types
interface ESPNTeam {
  id: string;
  displayName: string;
  logo: string;
}

interface ESPNCompetitor {
  team: ESPNTeam;
  score: string;
  records?: Array<{
    type: string;
    summary: string;
  }>;
}

interface ESPNCompetition {
  competitors: ESPNCompetitor[];
  status?: {
    type?: {
      completed?: boolean;
    };
  };
}

export interface ESPNEvent {
  week: {
    number: number;
  };
  competitions: ESPNCompetition[];
  date: string;
  season?: {
    type?: number;
    year?: number;
  };
  status?: {
    type?: {
      state?: string;
      completed?: boolean;
    };
  };
}

interface ESPNLeagueCalendarEntry {
  value: number; // The week number
  entries: Array<{
    // May vary depending on ESPN’s actual structure
    data: {
      events: ESPNEvent[];
    };
  }>;
}

interface ESPNLeague {
  calendar: ESPNLeagueCalendarEntry[];
}

interface ESPNResponse {
  // Instead of just `events: ESPNEvent[];`
  // ESPN now also includes "leagues" with a "calendar"
  leagues?: ESPNLeague[];
  // ESPN *may* still have "events" at the top level for the current week
  events?: ESPNEvent[];
}

export interface NFLPowerRanking {
  teamId: string;
  teamName: string;
  logoUrl: string;
  weeklyPowerRanks: WeeklyRank[];
}

interface WeeklyRank {
  week: number;
  rank: number;
  winPct: number;
}

interface WeekTeamData {
  teamId: string;
  teamName: string;
  logoUrl: string;
  conference: Conference;
  division: Division;
  wins: number;
  losses: number;
  ties: number;
  divisionRecord: { wins: number; losses: number; ties: number };
  conferenceRecord: { wins: number; losses: number; ties: number };
  pointsFor: number;
  pointsAgainst: number;
}

/**
 * Compute ranks for a single week's teams, given their performance.
 * Ranks by wins DESC, point differential DESC, then losses ASC,
 * then alphabetical order (ties).
 */
function computeRankingsForWeek(weekTeamData: WeekTeamData[]): Array<{ teamId: string; rank: number; winPct: number }> {
  const teamsWithStats = weekTeamData.map(team => {
    const totalGames = team.wins + team.losses + team.ties;
    // NFL uses this formula for win percentage: (wins + (ties/2)) / total games
    const winPct = totalGames > 0 
      ? parseFloat(((team.wins + (team.ties * 0.5)) / totalGames).toFixed(3))
      : 0.000;

    return {
      ...team,
      winPct,
      // NFL tiebreaker order: 1) Win%, 2) H2H, 3) Division record, 4) Common games
      divisionWinPct: calculateWinPct(
        team.divisionRecord.wins,
        team.divisionRecord.losses,
        team.divisionRecord.ties
      ),
      conferenceWinPct: calculateWinPct(
        team.conferenceRecord.wins,
        team.conferenceRecord.losses,
        team.conferenceRecord.ties
      ),
    };
  });

  // Sort teams by NFL criteria
  return teamsWithStats
    .sort((a, b) => {
      // Primary sort by win percentage
      if (a.winPct !== b.winPct) return b.winPct - a.winPct;
      
      // If same conference, use conference record
      if (a.conference === b.conference) {
        if (a.conferenceWinPct !== b.conferenceWinPct) {
          return b.conferenceWinPct - a.conferenceWinPct;
        }
      }
      
      // If same division, use division record
      if (a.division === b.division) {
        if (a.divisionWinPct !== b.divisionWinPct) {
          return b.divisionWinPct - a.divisionWinPct;
        }
      }
      
      // Last resort: point differential
      return (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst);
    })
    .map((team, index) => ({
      teamId: team.teamId,
      rank: index + 1,
      winPct: team.winPct
    }));
}

// Helper function to calculate win percentage in NFL format
function calculateWinPct(wins: number, losses: number, ties: number): number {
  const totalGames = wins + losses + ties;
  if (totalGames === 0) return 0.000;
  return parseFloat(((wins + (ties * 0.5)) / totalGames).toFixed(3));
}

/**
 * Helper: extract all valid past events from ESPN response
 */
function getAllValidEvents(scoreboard: ESPNResponse): ESPNEvent[] {
  const allEvents: ESPNEvent[] = [];
  
  // 1) If ESPN scoreboard has top-level events (preseason often in scoreboard.events)
  if (scoreboard.events && scoreboard.events.length > 0) {
    const validEvents = scoreboard.events.filter(ev => {
      // Adjust for your logic, e.g. only type=2 (regular) and year=2024:
      // return ev.season?.type === 2 && ev.season?.year === 2024;
      return true; // Replace with your matching condition
    });
    allEvents.push(...validEvents);
  }

  // 2) If ESPN scoreboard uses league.calendar for events (some seasons)
  scoreboard.leagues?.forEach(league => {
    league.calendar?.forEach(week => {
      week.entries?.forEach(entry => {
        if (entry.data?.events) {
          const validEvents = entry.data.events.filter(ev => {
            // Adjust for your logic as above:
            return true; // Replace with your matching condition
          });
          allEvents.push(...validEvents);
        }
      });
    });
  });
  
  return allEvents;
}

// Add this mapping at the top level
const ESPN_TO_LOCAL_ID: Record<string, string> = {
  '1': '1',  // Atlanta Falcons
  '2': '2',  // Buffalo Bills
  '3': '3',  // Chicago Bears
  '4': '4',  // Cincinnati Bengals
  '5': '5',  // Cleveland Browns
  '6': '6',  // Dallas Cowboys
  '7': '7',  // Denver Broncos
  '8': '8',  // Detroit Lions
  '9': '9',  // Green Bay Packers
  '10': '10', // Tennessee Titans
  '11': '11', // Indianapolis Colts
  '12': '12', // Kansas City Chiefs
  '13': '13', // Las Vegas Raiders
  '14': '14', // Los Angeles Rams
  '15': '15', // Miami Dolphins
  '16': '16', // Minnesota Vikings
  '17': '17', // New England Patriots
  '18': '18', // New Orleans Saints
  '19': '19', // New York Giants
  '20': '20', // New York Jets
  '21': '21', // Philadelphia Eagles
  '22': '22', // Arizona Cardinals
  '23': '23', // Pittsburgh Steelers
  '24': '24', // Los Angeles Chargers
  '25': '25', // San Francisco 49ers
  '26': '26', // Seattle Seahawks
  '27': '27', // Tampa Bay Buccaneers
  '28': '28', // Tennessee Titans
  '29': '29', // Washington Commanders
  '30': '30', // Carolina Panthers
  '31': '31', // Jacksonville Jaguars
  '33': '33', // Baltimore Ravens
  '34': '34', // Houston Texans
};

// Add this helper function at the top level
function logWeeklyStats(
  weeklyRankings: Record<
    number,
    Array<{
      teamId: string;
      rank: number;
      record: string;
      pointsFor: number;
      pointsAgainst: number;
    }>
  >
) {
  console.log('\n=== Weekly Team Rankings ===');

  Object.entries(weeklyRankings).forEach(([weekNum, rankings]) => {
    console.log(`\nWeek ${weekNum}:`);
    console.log('Rank | Team                  | Record  | Win% | PF  | PA  | DIFF');
    console.log('-----|----------------------|---------|------|-----|-----|-----');

    rankings.forEach(({ teamId, rank, record, pointsFor, pointsAgainst }) => {
      const team = NFL_TEAM_DATA[teamId];
      const [wins, losses, ties] = record.split('-').map(n => parseInt(n));
      const totalGames = wins + losses + (ties || 0);
      const winPct = totalGames > 0 
        ? ((wins + (ties || 0) * 0.5) / totalGames).toFixed(3)
        : '.000';

      const diff = pointsFor - pointsAgainst;
      const diffStr = (diff >= 0 ? '+' : '') + diff;

      const paddedRank = rank.toString().padStart(2, ' ');
      const paddedName = (team?.name || teamId).padEnd(20, ' ');
      const paddedRecord = record.padEnd(7, ' ');
      const paddedPF = pointsFor.toString().padStart(3, ' ');
      const paddedPA = pointsAgainst.toString().padStart(3, ' ');
      const paddedDiff = diffStr.padStart(4, ' ');

      console.log(`${paddedRank}   | ${paddedName} | ${paddedRecord} | ${winPct} | ${paddedPF} | ${paddedPA} | ${paddedDiff}`);
    });
  });
  console.log('\n');
}

export async function buildPowerRankingsOverTime(
  allEvents: ESPNEvent[]
): Promise<NFLPowerRanking[]> {
  console.log('Total events to process:', allEvents.length);
  
  const weeklyTeamData = new Map<string, Record<number, {
    pointsFor: number;
    pointsAgainst: number;
    wins: number;
    losses: number;
    ties: number;
  }>>();

  let maxCompletedWeek = 0; // Track highest completed week found

  for (const event of allEvents) {
    const weekNumber = event.week?.number;
    if (!weekNumber) continue;

    // If the event is not completed, skip it
    if (!event.status?.type?.completed) {
      continue;
    }

    // Update maxCompletedWeek if we proceed
    maxCompletedWeek = Math.max(maxCompletedWeek, weekNumber);

    for (const competition of event.competitions ?? []) {
      if (!competition.status?.type?.completed) {
        continue;
      }

      const { competitors } = competition;
      if (!competitors || competitors.length < 2) continue;

      const home = competitors[0];
      const away = competitors[1];
      const homeScore = parseInt(home.score, 10) || 0;
      const awayScore = parseInt(away.score, 10) || 0;

      const recordStats = (comp: typeof home, ptsFor: number, ptsAgainst: number, isWinner: boolean, isTie: boolean) => {
        const espnTeamId = comp?.team?.id;
        if (!espnTeamId) return;
        
        const teamId = ESPN_TO_LOCAL_ID[espnTeamId] || espnTeamId;

        if (!weeklyTeamData.has(teamId)) {
          weeklyTeamData.set(teamId, {});
        }
        const teamWeeks = weeklyTeamData.get(teamId)!;
        if (!teamWeeks[weekNumber]) {
          teamWeeks[weekNumber] = {
            pointsFor: 0,
            pointsAgainst: 0,
            wins: 0,
            losses: 0,
            ties: 0,
          };
        }
        teamWeeks[weekNumber].pointsFor += ptsFor;
        teamWeeks[weekNumber].pointsAgainst += ptsAgainst;

        if (isWinner) {
          teamWeeks[weekNumber].wins += 1;
        } else if (isTie) {
          teamWeeks[weekNumber].ties += 1;
        } else {
          teamWeeks[weekNumber].losses += 1;
        }
      };

      const isHomeWinner = homeScore > awayScore;
      const isTie = homeScore === awayScore;

      recordStats(home, homeScore, awayScore, isHomeWinner, isTie);
      recordStats(away, awayScore, homeScore, !isHomeWinner && !isTie, isTie);
    }
  }

  // Build weeklyRankings only up to the final completed week
  const weeklyRankings: Record<number, Array<{
    teamId: string;
    rank: number;
    record: string;
    pointsFor: number;
    pointsAgainst: number;
  }>> = {};

  for (let week = 1; week <= maxCompletedWeek; week++) {
    // gather stats cumulatively for 'week'
    const teamStatsArr: Array<{
      teamId: string;
      wins: number;
      losses: number;
      ties: number;
      pointsFor: number;
      pointsAgainst: number;
    }> = [];

    NFL_TEAM_IDS.forEach((tid) => {
      const weeksData = weeklyTeamData.get(tid);
      if (!weeksData) {
        teamStatsArr.push({ teamId: tid, wins: 0, losses: 0, ties: 0, pointsFor: 0, pointsAgainst: 0 });
        return;
      }

      let wins = 0, losses = 0, ties = 0, pointsFor = 0, pointsAgainst = 0;
      for (let w = 1; w <= week; w++) {
        const rec = weeksData[w];
        if (!rec) continue;
        wins       += rec.wins;
        losses     += rec.losses;
        ties       += rec.ties;
        pointsFor  += rec.pointsFor;
        pointsAgainst += rec.pointsAgainst;
      }
      teamStatsArr.push({ teamId: tid, wins, losses, ties, pointsFor, pointsAgainst });
    });

    // Sort them using tie-breakers
    teamStatsArr.sort((a, b) => {
      const winPctA = (a.wins + 0.5 * a.ties) / (a.wins + a.losses + a.ties || 1);
      const winPctB = (b.wins + 0.5 * b.ties) / (b.wins + b.losses + b.ties || 1);
      if (winPctB !== winPctA) return winPctB - winPctA;
      if (b.pointsFor !== a.pointsFor) return b.pointsFor - a.pointsFor;
      return 0;
    });

    let lastKey = '';
    let lastRank = 1;
    const outArr: Array<{
      teamId: string;
      rank: number;
      record: string;
      pointsFor: number;
      pointsAgainst: number;
    }> = [];

    teamStatsArr.forEach((stats, idx) => {
      const key = `${(stats.wins + 0.5 * stats.ties) / (stats.wins + stats.losses + stats.ties || 1)}-${stats.pointsFor}`;
      const rank = key === lastKey ? lastRank : idx + 1;
      lastKey = key;
      lastRank = rank;

      outArr.push({
        teamId: stats.teamId,
        rank,
        record: `${stats.wins}-${stats.losses}${stats.ties ? `-${stats.ties}` : ''}`,
        pointsFor: stats.pointsFor,
        pointsAgainst: stats.pointsAgainst,
      });
    });

    weeklyRankings[week] = outArr;
  }

  // Log the final weekly stats
  logWeeklyStats(weeklyRankings);

  // Transform into final array to return
  const finalPowerRankings: NFLPowerRanking[] = NFL_TEAM_IDS.map((tid) => {
    const matchingTeamData = NFL_TEAM_DATA[tid];
    const teamName = matchingTeamData?.name || tid;
    const logoUrl = matchingTeamData?.logo || '';

    const weeklyPowerRanks = Object.entries(weeklyRankings).map(([weekStr, ranks]) => {
      const week = parseInt(weekStr);
      const found = ranks.find(r => r.teamId === tid);

      const recordStr = found?.record || '0-0'; // W-L or W-L-T
      const [wins, losses, ties] = recordStr.split('-').map(n => parseInt(n) || 0);
      const totalGames = wins + losses + ties;
      const winPct = totalGames > 0
        ? parseFloat(((wins + 0.5 * ties) / totalGames).toFixed(3))
        : 0.000;

      return {
        week,
        rank: found?.rank ?? 32,
        winPct,
        record: recordStr,
        teamId: tid
      };
    });

    return {
      teamId: tid,
      teamName,
      logoUrl,
      weeklyPowerRanks
    };
  });

  return finalPowerRankings;
} 