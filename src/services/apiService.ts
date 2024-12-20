// src/services/apiService.ts

// Types for ESPN API response
interface ESPNGame {
  id: string;
  name: string;
  date: string;
  competitions: Array<{
    competitors: Array<{
      team: {
        id: string;
        name: string;
        abbreviation: string;
        displayName: string;
        logo: string;
      };
      score: string;
      homeAway: string;
    }>;
    status: {
      type: {
        state: string;
        completed: boolean;
      };
    };
  }>;
}

interface ESPNResponse {
  events: ESPNGame[];
  week: {
    number: number;
  };
}

// API endpoint
const ESPN_SCOREBOARD_API = "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

// Transform ESPN data to your app's format
function transformRankingData(data: ESPNResponse) {
  return {
    games: data.events.map((event) => {
      const game = event.competitions[0];
      const homeTeam = game.competitors.find(team => team.homeAway === 'home');
      const awayTeam = game.competitors.find(team => team.homeAway === 'away');

      return {
        id: event.id,
        name: event.name,
        date: new Date(event.date),
        status: game.status.type.state,
        isComplete: game.status.type.completed,
        homeTeam: {
          id: homeTeam?.team.id || '',
          name: homeTeam?.team.name || '',
          abbreviation: homeTeam?.team.abbreviation || '',
          displayName: homeTeam?.team.displayName || '',
          logo: homeTeam?.team.logo || '',
          score: parseInt(homeTeam?.score || '0'),
        },
        awayTeam: {
          id: awayTeam?.team.id || '',
          name: awayTeam?.team.name || '',
          abbreviation: awayTeam?.team.abbreviation || '',
          displayName: awayTeam?.team.displayName || '',
          logo: awayTeam?.team.logo || '',
          score: parseInt(awayTeam?.score || '0'),
        },
      };
    }),
    week: data.week.number,
  };
}

// Fetch weekly rankings
async function fetchWeeklyRankings() {
  try {
    const response = await fetch(ESPN_SCOREBOARD_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ESPNResponse = await response.json();
    return transformRankingData(data);
  } catch (error) {
    console.error("Error fetching weekly rankings:", error);
    throw error;
  }
}

// Get specific game details
async function fetchGameDetails(gameId: string) {
  try {
    const response = await fetch(`${ESPN_SCOREBOARD_API}/events/${gameId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return transformRankingData({ events: [data], week: data.week });
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
}

// Export functions
export {
  fetchWeeklyRankings,
  fetchGameDetails,
};

// Export types
export type { ESPNGame, ESPNResponse };