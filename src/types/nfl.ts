export type Conference = 'AFC' | 'NFC'
export type Division = 'North' | 'South' | 'East' | 'West'

export interface Team {
  id: string
  name: string
  displayName: string
  conference: Conference
  division: Division
  logoUrl: string
  record: {
    wins: number
    losses: number
    ties: number
  }
  ranking: number
}

export interface TeamRecord {
  teamId: string
  week: number
  rank: number
  wins: number
  losses: number
  ties: number
}

export interface StandingsData {
  teams: Team[]
  records: TeamRecord[]
  currentWeek: number
}

export interface TeamData {
  name: string;
  conference: 'AFC' | 'NFC';
  division: 'AFC East' | 'AFC West' | 'AFC North' | 'AFC South'
          | 'NFC East' | 'NFC West' | 'NFC North' | 'NFC South'
          | '';
  logo?: string;
  weeklyPowerRanks: Array<{
    week: number;
    rank: number;
  }>;
}

