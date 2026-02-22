import axios from "axios";
import {
  generateMockAirQualityData,
  generateMockTrendData,
} from "../utils/mockData";

const API_BASE_URL = "http://localhost:5000/api";
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true" || false;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data?.message || "An error occurred");
    } else if (error.request) {
      // If network error and mock data is enabled, return mock data
      if (USE_MOCK_DATA) {
        return null; // Will be handled in the API functions
      }
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error(error.message || "An unexpected error occurred");
    }
  },
);

export const airQualityAPI = {
  /**
   * Get current air quality data for a city
   * @param {string} city - City name
   * @returns {Promise} Air quality data
   */
  getCurrentAirQuality: async (city) => {
    try {
      const data = await api.get(`/air-quality/${encodeURIComponent(city)}`);
      return data;
    } catch (error) {
      // Fallback to mock data if API fails and mock mode is enabled
      if (USE_MOCK_DATA || error.message.includes("Network error")) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return generateMockAirQualityData(city);
      }
      throw error;
    }
  },

  /**
   * Get 24-hour trend data for a city
   * @param {string} city - City name
   * @returns {Promise} 24-hour trend data
   */
  get24HourTrend: async (city) => {
    try {
      const data = await api.get(
        `/air-quality/${encodeURIComponent(city)}/trend/24h`,
      );
      return data;
    } catch (error) {
      if (USE_MOCK_DATA || error.message.includes("Network error")) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return generateMockTrendData("24h");
      }
      throw error;
    }
  },

  /**
   * Get 7-day history data for a city
   * @param {string} city - City name
   * @returns {Promise} 7-day history data
   */
  get7DayHistory: async (city) => {
    try {
      const data = await api.get(
        `/air-quality/${encodeURIComponent(city)}/history/7d`,
      );
      return data;
    } catch (error) {
      if (USE_MOCK_DATA || error.message.includes("Network error")) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return generateMockTrendData("7d");
      }
      throw error;
    }
  },

  /**
   * Compare air quality between two cities
   * @param {string} city1 - First city name
   * @param {string} city2 - Second city name
   * @returns {Promise} Comparison data
   */
  compareCities: async (city1, city2) => {
    try {
      const data = await api.get(`/air-quality/compare`, {
        params: { city1, city2 },
      });
      return data;
    } catch (error) {
      if (USE_MOCK_DATA || error.message.includes("Network error")) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          city1: generateMockAirQualityData(city1),
          city2: generateMockAirQualityData(city2),
        };
      }
      throw error;
    }
  },
};

export default api;
