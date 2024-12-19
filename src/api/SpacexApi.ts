import axios from "axios";
import { LaunchData } from "../types";

const BASE_URL = "https://api.spacexdata.com/v4";

export const fetchLaunches = async (): Promise<LaunchData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/launches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launches", error);
    throw error;
  }
};
