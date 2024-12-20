import axios from "axios";
import { StandingsData } from "@/src/types/nfl";

const API_BASE_URL = process.env.NEXT_PUBLIC_NFL_API_URL;
const API_KEY = process.env.NFL_API_KEY;

export async function fetchStandings(): Promise<StandingsData> {
  try {
    const response = await axios.get(`${API_BASE_URL}/standings`, {
      headers: { 
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
} 