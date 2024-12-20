"use client";

import React, { useState, useEffect, ReactElement, JSXElementConstructor, useCallback, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import Image from "next/image";
import { NFLPowerRanking } from "@/src/lib/process-rankings";
import { NFL_TEAM_DATA } from "@/src/lib/team-data";
import { SVGProps } from 'react';
import { useRouter } from 'next/navigation';
import { CategoricalChartState } from 'recharts/types/chart/types';
import { ShareButton } from "@/src/components/ui/share-button";

type ChartMouseEvent = {
  activePayload?: Array<{
    payload: {
      teamId: string;
      rank: number;
      week: number;
      winPct: number;
      record: string;
    };
  }>;
  activeCoordinate?: {
    x: number;
    y: number;
  };
};

interface RankingsChartProps {
  teamsData: NFLPowerRanking[];
  initialQuery?: string;
  pathname?: string;
}

// Update tooltip props to include coordinate information
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      week: number;
      rank: number;
      winPct: number;
      record: string;
      teamId: string;
    };
  }>;
  label?: number;
  coordinate?: { x: number; y: number };
}

interface CustomTooltipProps extends TooltipProps {
  hoveredTeam: string | null;
  isTooltipActive: boolean;
}

function CustomTooltip({
  hoveredTeam,
  active,
  payload,
  label,
  isTooltipActive
}: CustomTooltipProps) {
  if (!isTooltipActive || !active || !payload || payload.length === 0) return null;

  const dataPoint =
    hoveredTeam
      ? payload.find(p => p.payload.teamId === hoveredTeam)?.payload
      : payload[0]?.payload;

  if (!dataPoint) return null;

  const team = NFL_TEAM_DATA[dataPoint.teamId];

  return (
    <div 
      className="p-3 bg-white border rounded-lg shadow-lg"
      style={{ pointerEvents: 'none' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Image
          src={team.logo}
          alt={team.name}
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="font-bold">{team.name}</span>
      </div>
      <div className="space-y-1 text-sm">
        <p>Week {label}</p>
        <p>Rank: {dataPoint.rank}</p>
        <p>Record: {dataPoint.record}</p>
      </div>
    </div>
  );
}

// Add these type definitions
type DotProps = {
  cx: number;
  cy: number;
  index: number;
  value: number;
} & SVGProps<SVGElement>;

type LabelProps = {
  x: number;
  y: number;
  index: number;
  value: number;
} & SVGProps<SVGElement>;

// Add new type for label props
type CustomLabelProps = {
  x: number;
  y: number;
  value: number;
  stroke: string;
  teamId: string;
  isHovered: boolean;
  isPinned: boolean;
  isDimmed: boolean;
  isLastPoint?: boolean;
};

// Add this new type for touch interaction
type TouchPoint = {
  x: number;
  y: number;
  teamId: string | null;
};

export default function RankingsChart({
  teamsData,
  initialQuery = "",
  pathname = "",
}: RankingsChartProps) {
  const router = useRouter();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);
  const [pinnedTeamId, setPinnedTeamId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [touchPoint, setTouchPoint] = useState<TouchPoint | null>(null);

  useEffect(() => {
    if (teamsData?.length) {
      console.log("Chart initialized:", { teamCount: teamsData.length });
      console.log("Chart received data:", {
        teamCount: teamsData.length,
        sampleTeam: teamsData[0],
        hasRankings:
          teamsData.length > 0 &&
          teamsData.some(
            (t) =>
              t?.weeklyPowerRanks &&
              Array.isArray(t.weeklyPowerRanks) &&
              t.weeklyPowerRanks.length > 0
          ),
      });
    }
  }, [teamsData]);

  // 1. Validate
  if (!Array.isArray(teamsData)) {
    return <div className="text-red-500">No valid teams data available.</div>;
  }

  // 2. Memoize the sorting step so it doesn’t run on every re-render
  const validTeamsData = useMemo(() => {
    return teamsData.map((team) => ({
      ...team,
      weeklyPowerRanks: [...team.weeklyPowerRanks].sort((a, b) => a.week - b.week),
    }));
  }, [teamsData]);

  if (!validTeamsData.length) {
    console.log("No valid rankings found in:", teamsData);
    return (
      <div className="text-center p-4">
        <p>No ranking data available for the current week.</p>
      </div>
    );
  }

  // 4. If selectedTeams is empty, we’ll show all teams by default
  const finalTeamsToPlot =
    selectedTeams.length > 0
      ? validTeamsData.filter((team) => selectedTeams.includes(team.teamId))
      : validTeamsData;

  // 5. Find min/max weeks
  const allWeeks = validTeamsData.flatMap((team) =>
    team.weeklyPowerRanks.map((wr) => wr.week)
  );
  const minWeek = Math.min(...allWeeks);
  const maxWeek = Math.max(...allWeeks);

  // -- Utility for toggling any team --
  const handleTeamToggle = (teamId: string) => {
    setSelectedTeams((prev) => {
      const newSelection = prev.includes(teamId)
        ? prev.filter((tid) => tid !== teamId)
        : [...prev, teamId];
      return newSelection;
    });
  };

  // 6. Build grouped UI for toggling teams by conference/division
  const conferences = ["AFC", "NFC"];
  const divisions = ["North", "South", "East", "West"];

  const renderTeamToggle = (team: NFLPowerRanking) => {
    const isSelected = selectedTeams.includes(team.teamId);
    return (
      <button
        key={team.teamId}
        onClick={() => handleTeamToggle(team.teamId)}
        className={`flex items-center gap-2 p-2 rounded ${
          isSelected ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
        }`}
      >
        <Image
          src={NFL_TEAM_DATA[team.teamId].logo}
          alt={team.teamName}
          width={24}
          height={24}
        />
        <span>{team.teamName}</span>
      </button>
    );
  };

  // 7. Our custom legend simply shows the team toggles (hidden in this snippet).
  //    We'll keep or remove as needed, but in this example we rely on the new 
  //    grouping below the chart.
  const renderCustomLegend = () => null;

  // (2) Add a short function to toggle all teams in a conference
  const handleConferenceToggle = (conf: string) => {
    const teamsInConf = validTeamsData
      .filter((t) => NFL_TEAM_DATA[t.teamId].conference === conf)
      .map((t) => t.teamId);

    setSelectedTeams((prev) => {
      const alreadyAllSelected = teamsInConf.every((tid) => prev.includes(tid));
      if (alreadyAllSelected) {
        return prev.filter((tid) => !teamsInConf.includes(tid));
      } else {
        return Array.from(new Set([...prev, ...teamsInConf]));
      }
    });
  };

  const handleDivisionToggle = (conf: string, div: string) => {
    const teamsInDiv = validTeamsData
      .filter((t) => {
        const info = NFL_TEAM_DATA[t.teamId];
        return info.conference === conf && info.division === div;
      })
      .map((t) => t.teamId);

    setSelectedTeams((prev) => {
      const allSelected = teamsInDiv.every((tid) => prev.includes(tid));
      if (allSelected) {
        return prev.filter((tid) => !teamsInDiv.includes(tid));
      }
      return [...new Set([...prev, ...teamsInDiv])];
    });
  };

  // Update mouse position handler
  const handleMouseMove = (state: CategoricalChartState) => {
    if (state?.activeCoordinate) {
      setMousePosition({
        x: state.activeCoordinate.x,
        y: state.activeCoordinate.y
      });
    }
  };

  // Simplified function to hover only if no team is pinned,
  // otherwise keep the pinned highlight stable.
  const handleTeamHover = useCallback(
    (teamId: string | null) => {
      if (pinnedTeamId) return; 
      setHoveredTeamId(teamId);
      setIsTooltipActive(Boolean(teamId));
    },
    [pinnedTeamId]
  );

  // Unified pinned logic: click on a line or dot toggles "pinned" highlight
  const togglePinnedTeam = useCallback((teamId: string) => {
    setPinnedTeamId((prev) => (prev === teamId ? null : teamId));
    setHoveredTeamId(null); // remove any ephemeral hover
    setIsTooltipActive((prev) => (prev ? false : true));
  }, []);

  // When clicking/tapping outside (background), clear pinned and hovered
  const handleChartBackgroundClick = useCallback(() => {
    setPinnedTeamId(null);
    setHoveredTeamId(null);
    setIsTooltipActive(false);
  }, []);

  // Update the dot click handler
  const handleDotClick = useCallback((teamId: string) => {
    setPinnedTeamId(prevPinned => {
      const newPinned = prevPinned === teamId ? null : teamId;
      setIsTooltipActive(Boolean(newPinned));
      return newPinned;
    });
  }, []);

  // Determine if we should show detailed view (5 or fewer teams)
  const showDetailedView = finalTeamsToPlot.length <= 5;

  // Move CustomLabel here to access state and handlers
  const CustomLabel = ({
    x,
    y,
    value,
    stroke,
    teamId,
    isHovered,
    isPinned,
    isDimmed,
    isLastPoint,
  }: CustomLabelProps) => {
    const opacity = isDimmed ? 0.2 : 1;
    const fontSize = isHovered || isPinned ? 14 : 12;
    const fontWeight = isHovered || isPinned ? 'bold' : 'normal';

    const handleTouch = (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setTouchPoint({
        x: x + (isLastPoint ? 52 : 0),
        y: y,
        teamId: teamId
      });
      handleDotClick(teamId);
    };

    return (
      <g transform={`translate(${x},${y})`}>
        {isLastPoint && (
          <svg x={8} y={-12} width={24} height={24}>
            <image
              href={NFL_TEAM_DATA[teamId].logo}
              width={24}
              height={24}
              style={{
                filter: isDimmed ? 'opacity(20%)' : undefined
              }}
            />
          </svg>
        )}
        <rect
          x={isLastPoint ? 40 : -12}
          y={-8}
          width={24}
          height={16}
          rx={8}
          fill="white"
          opacity={0.8}
          style={{ cursor: 'pointer' }}
          onClick={() => handleDotClick(teamId)}
          onTouchStart={handleTouch}
        />
        <text
          x={isLastPoint ? 52 : 0}
          y={4}
          textAnchor={isLastPoint ? "start" : "middle"}
          fill={stroke}
          opacity={opacity}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {value}
        </text>
      </g>
    );
  };

  // Update renderDot to include keys for SVG elements
  const renderDot = (team: NFLPowerRanking) => {
    return (props: DotProps) => {
      const isHovered = hoveredTeamId === team.teamId;
      const isPinned = pinnedTeamId === team.teamId;
      const isDimmed = (hoveredTeamId || pinnedTeamId) && !isHovered && !isPinned;
      const isLastPoint = props.index === team.weeklyPowerRanks.length - 1;
      
      const dotKey = `dot-${team.teamId}-${props.index}`;
      
      if (showDetailedView) {
        return <g key={dotKey} />;
      }

      if (isLastPoint) {
        return (
          <g key={dotKey}>
            <svg x={props.cx + 8} y={props.cy - 12} width={24} height={24}>
              <image
                href={NFL_TEAM_DATA[team.teamId].logo}
                width={24}
                height={24}
                style={{
                  opacity: isDimmed ? 0.2 : 1,
                  filter: isDimmed ? 'grayscale(100%)' : undefined
                }}
              />
            </svg>
          </g>
        );
      }

      const shouldShowDot = isHovered || isPinned || touchPoint?.teamId === team.teamId;
      if (!shouldShowDot) {
        return <g key={dotKey} />;
      }

      const handleTouch = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setTouchPoint({
          x: props.cx,
          y: props.cy,
          teamId: team.teamId
        });
        handleDotClick(team.teamId);
      };

      return (
        <g key={dotKey}>
          <circle
            cx={props.cx}
            cy={props.cy}
            r={6}
            fill={NFL_TEAM_DATA[team.teamId].color}
            opacity={(!hoveredTeamId && !pinnedTeamId) || isHovered || isPinned ? 1 : 0.2}
            style={{ cursor: 'pointer' }}
            onTouchStart={handleTouch}
            onClick={() => handleDotClick(team.teamId)}
          />
        </g>
      );
    };
  };

  // Update chart touch handler
  const handleChartTouch = (e: React.TouchEvent) => {
    const target = e.target as Element;
    if (!target.closest('circle') && !target.closest('rect')) {
      setTouchPoint(null);
      setPinnedTeamId(null);
      setIsTooltipActive(false);
    }
  };

  // NEW: parse query params on mount
  useEffect(() => {
    if (!initialQuery) return;
    const params = new URLSearchParams(initialQuery);

    // teams=CAR,DET,....
    const teamsParam = params.get("teams");
    if (teamsParam) {
      const teamsArray = teamsParam.split(",").filter(Boolean);
      setSelectedTeams(prev => Array.from(new Set([...prev, ...teamsArray])));
    }

    // conferences=AFC,NFC
    const confParam = params.get("conferences");
    if (confParam) {
      const confArray = confParam.split(",").filter(Boolean);
      confArray.forEach(conf => {
        handleConferenceToggle(conf);
      });
    }

    // divisions=North,South,East,West
    const divParam = params.get("divisions");
    if (divParam) {
      const divArray = divParam.split(",").filter(Boolean);
      // By default, no "conference" is indicated, so we run each conf
      // that might be in the data set, or if user combined conf+div, 
      // they'd both appear. Adjust logic as needed:
      conferences.forEach(conf => {
        divArray.forEach(div => {
          handleDivisionToggle(conf, div);
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only once on mount

  // NEW: Update URL when filters change
  const updateUrlWithFilters = useCallback(() => {
    const params = new URLSearchParams();

    // Add selected teams to URL
    if (selectedTeams.length > 0) {
      params.set('teams', selectedTeams.join(','));
    }

    // Add selected conferences
    const selectedConfs = conferences.filter(conf => {
      const teamsInConf = validTeamsData.filter(t => 
        NFL_TEAM_DATA[t.teamId].conference === conf
      );
      return teamsInConf.every(t => selectedTeams.includes(t.teamId));
    });
    if (selectedConfs.length > 0) {
      params.set('conferences', selectedConfs.join(','));
    }

    // Add selected divisions
    const selectedDivs = divisions.filter(div => 
      conferences.some(conf => {
        const teamsInDiv = validTeamsData.filter(t => {
          const info = NFL_TEAM_DATA[t.teamId];
          return info.conference === conf && info.division === div;
        });
        return teamsInDiv.every(t => selectedTeams.includes(t.teamId));
      })
    );
    if (selectedDivs.length > 0) {
      params.set('divisions', selectedDivs.join(','));
    }

    // Update URL without reload
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  }, [selectedTeams, validTeamsData, pathname, router]);

  // Update URL whenever filters change
  useEffect(() => {
    updateUrlWithFilters();
  }, [selectedTeams, updateUrlWithFilters]);

  // 2) Add a new reset function for clearing filters/pins:
  const handleResetFilters = useCallback(() => {
    setSelectedTeams([]);
    setPinnedTeamId(null);
    setHoveredTeamId(null);
  }, []);

  return (
    <div className="space-y-2 sm:space-y-4 p-2 sm:p-4">
      {/* Header section with title, subtitle, and action buttons */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-grow text-center">
            <h2 className="text-xl sm:text-2xl font-bold">NFL Power Rankings</h2>
            <p className="text-sm italic text-gray-600">
              created by Anil Chitrapu
            </p>
          </div>
          
          {/* Action buttons container */}
          <div className="flex items-center gap-2 ml-4">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium transition-colors"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
            <ShareButton 
              title="NFL Power Rankings"
              text="Check out these NFL Power Rankings!"
              url={typeof window !== 'undefined' ? window.location.href : undefined}
            />
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div 
        className="w-full overflow-x-auto touch-pan-x touch-pan-y"
        onTouchStart={handleChartTouch}
      >
        <ResponsiveContainer width="100%" height={500}>
          <LineChart 
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              if (!pinnedTeamId) {
                setHoveredTeamId(null);
                setIsTooltipActive(false);
              }
            }}
            onClick={handleChartBackgroundClick}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="week"
              type="number"
              domain={[minWeek, maxWeek]}
              allowDecimals={false}
              interval={0}
              tick={{ fontSize: 12 }}
              label={{
                value: "Week",
                position: "bottom",
                offset: 0,
                fontSize: 14
              }}
            />
            <YAxis
              reversed
              domain={[1, 32]}
              allowDecimals={false}
              interval={0}
              tickCount={8}
              tick={{ fontSize: 12 }}
              label={{
                value: "Power Rank",
                angle: -90,
                position: "insideLeft",
                offset: -20,
                fontSize: 14,
                style: { textAnchor: 'middle' }
              }}
              ticks={[4, 8, 12, 16, 20, 24, 28, 32]}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              content={
                <CustomTooltip 
                  hoveredTeam={hoveredTeamId || pinnedTeamId || touchPoint?.teamId || null}
                  isTooltipActive={isTooltipActive || !!pinnedTeamId || !!touchPoint}
                />
              }
              cursor={false}
              isAnimationActive={false}
              position={touchPoint || undefined}
            />

            {finalTeamsToPlot.map((team) => {
              const isHovered = hoveredTeamId === team.teamId;
              const isPinned = pinnedTeamId === team.teamId;
              const isDimmed = (hoveredTeamId || pinnedTeamId) && !isHovered && !isPinned;
              
              return (
                <Line
                  key={team.teamId}
                  data={team.weeklyPowerRanks}
                  type="linear"
                  dataKey="rank"
                  name={team.teamName}
                  stroke={NFL_TEAM_DATA[team.teamId].color}
                  strokeWidth={isHovered || isPinned ? 3 : 2}
                  strokeOpacity={isDimmed ? 0.2 : 1}
                  dot={renderDot(team)}
                  activeDot={false}
                  label={showDetailedView ? props => (
                    <CustomLabel
                      {...props}
                      teamId={team.teamId}
                      stroke={NFL_TEAM_DATA[team.teamId].color}
                      isHovered={isHovered}
                      isPinned={isPinned}
                      isDimmed={isDimmed}
                      isLastPoint={props.index === team.weeklyPowerRanks.length - 1}
                    />
                  ) : undefined}
                  onMouseEnter={() => handleTeamHover(team.teamId)}
                  onMouseLeave={() => !pinnedTeamId && handleTeamHover(null)}
                  onClick={() => togglePinnedTeam(team.teamId)}
                  style={{ cursor: 'pointer' }}
                  isAnimationActive={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Updated layout container for conferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {conferences.map((conf) => (
          <div key={conf} className="border rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {conf}
                </h3>
                <button
                  className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50 
                    transition-colors duration-200 text-sm font-medium"
                  onClick={() => handleConferenceToggle(conf)}
                >
                  Toggle All {conf}
                </button>
              </div>
            </div>
            
            {/* Replace 'divide-y' with a simpler grid layout for divisions */}
            <div className="grid grid-cols-1 gap-4">
              {divisions.map((div) => {
                const teamsInGroup = validTeamsData.filter((t) => {
                  const info = NFL_TEAM_DATA[t.teamId];
                  return info.conference === conf && info.division === div;
                });
                if (!teamsInGroup.length) return null;

                const allDivSelected = teamsInGroup.every((t) => 
                  selectedTeams.includes(t.teamId)
                );

                return (
                  <div
                    key={`${conf}-${div}`}
                    className="p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-700">
                        {conf} {div}
                      </h4>
                      <button
                        onClick={() => handleDivisionToggle(conf, div)}
                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                          allDivSelected 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        Toggle Division
                      </button>
                    </div>
                    {/* Updated team grid layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {teamsInGroup.map((team) => (
                        <button
                          key={`team-${team.teamId}`}
                          onClick={() => handleTeamToggle(team.teamId)}
                          className={`flex items-center gap-3 p-3 rounded transition-colors min-h-[3rem] ${
                            selectedTeams.includes(team.teamId)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="w-6 h-6 flex-shrink-0">
                            <Image
                              src={NFL_TEAM_DATA[team.teamId].logo}
                              alt={team.teamName}
                              width={24}
                              height={24}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-sm leading-tight break-words">{team.teamName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
