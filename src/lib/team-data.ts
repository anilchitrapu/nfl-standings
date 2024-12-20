import { Conference, Division } from '@/src/types/nfl';

export interface NFLTeamInfo {
  name: string;
  color: string;
  logo: string;
  conference: Conference;
  division: Division;
}

export const NFL_TEAM_DATA: Record<string, NFLTeamInfo> = {
  '1': {
    name: 'Atlanta Falcons',
    color: '#A71930',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png',
    conference: 'NFC',
    division: 'South',
  },
  '2': {
    name: 'Buffalo Bills',
    color: '#00338D',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    conference: 'AFC',
    division: 'East',
  },
  '3': {
    name: 'Chicago Bears',
    color: '#C83803',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
    conference: 'NFC',
    division: 'North',
  },
  '4': {
    name: 'Cincinnati Bengals',
    color: '#FB4F14',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
    conference: 'AFC',
    division: 'North',
  },
  '5': {
    name: 'Cleveland Browns',
    color: '#311D00',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png',
    conference: 'AFC',
    division: 'North',
  },
  '6': {
    name: 'Dallas Cowboys',
    color: '#041E42',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
    conference: 'NFC',
    division: 'East',
  },
  '7': {
    name: 'Denver Broncos',
    color: '#FB4F14',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
    conference: 'AFC',
    division: 'West',
  },
  '8': {
    name: 'Detroit Lions',
    color: '#0076B6',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png',
    conference: 'NFC',
    division: 'North',
  },
  '9': {
    name: 'Green Bay Packers',
    color: '#203731',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
    conference: 'NFC',
    division: 'North',
  },
  '10': {
    name: 'Tennessee Titans',
    color: '#0C2340',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png',
    conference: 'AFC',
    division: 'South',
  },
  '11': {
    name: 'Indianapolis Colts',
    color: '#002C5F',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png',
    conference: 'AFC',
    division: 'South',
  },
  '12': {
    name: 'Kansas City Chiefs',
    color: '#E31837',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    conference: 'AFC',
    division: 'West',
  },
  '13': {
    name: 'Las Vegas Raiders',
    color: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png',
    conference: 'AFC',
    division: 'West',
  },
  '14': {
    name: 'Los Angeles Rams',
    color: '#003594',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png',
    conference: 'NFC',
    division: 'West',
  },
  '15': {
    name: 'Miami Dolphins',
    color: '#008E97',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png',
    conference: 'AFC',
    division: 'East',
  },
  '16': {
    name: 'Minnesota Vikings',
    color: '#4F2683',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
    conference: 'NFC',
    division: 'North',
  },
  '17': {
    name: 'New England Patriots',
    color: '#002244',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
    conference: 'AFC',
    division: 'East',
  },
  '18': {
    name: 'New Orleans Saints',
    color: '#D3BC8D',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png',
    conference: 'NFC',
    division: 'South',
  },
  '19': {
    name: 'New York Giants',
    color: '#0B2265',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png',
    conference: 'NFC',
    division: 'East',
  },
  '20': {
    name: 'New York Jets',
    color: '#125740',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png',
    conference: 'AFC',
    division: 'East',
  },
  '21': {
    name: 'Philadelphia Eagles',
    color: '#004C54',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
    conference: 'NFC',
    division: 'East',
  },
  '22': {
    name: 'Arizona Cardinals',
    color: '#97233F',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png',
    conference: 'NFC',
    division: 'West',
  },
  '23': {
    name: 'Pittsburgh Steelers',
    color: '#FFB612',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png',
    conference: 'AFC',
    division: 'North',
  },
  '24': {
    name: 'Los Angeles Chargers',
    color: '#0080C6',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png',
    conference: 'AFC',
    division: 'West',
  },
  '25': {
    name: 'San Francisco 49ers',
    color: '#AA0000',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
    conference: 'NFC',
    division: 'West',
  },
  '26': {
    name: 'Seattle Seahawks',
    color: '#002244',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png',
    conference: 'NFC',
    division: 'West',
  },
  '27': {
    name: 'Tampa Bay Buccaneers',
    color: '#D50A0A',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png',
    conference: 'NFC',
    division: 'South',
  },
  '28': {
    name: 'Washington Commanders',
    color: '#773141',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png',
    conference: 'NFC',
    division: 'East',
  },
  '29': {
    name: 'Carolina Panthers',
    color: '#0085CA',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png',
    conference: 'NFC',
    division: 'South',
  },
  '30': {
    name: 'Jacksonville Jaguars',
    color: '#006778',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png',
    conference: 'AFC',
    division: 'South',
  },
  '33': {
    name: 'Baltimore Ravens',
    color: '#241773',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
    conference: 'AFC',
    division: 'North',
  },
  '34': {
    name: 'Houston Texans',
    color: '#03202F',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png',
    conference: 'AFC',
    division: 'South',
  }
};

export const NFL_TEAM_IDS = Object.keys(NFL_TEAM_DATA); 