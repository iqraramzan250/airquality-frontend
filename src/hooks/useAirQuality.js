import { useState, useEffect } from "react";
import { airQualityAPI } from "../services/api";

/**
 * Custom hook for fetching air quality data
 * @param {string} city - City name
 * @param {boolean} enabled - Whether to fetch data
 * @returns {Object} Air quality data, loading state, and error
 */
export const useAirQuality = (city, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !enabled) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await airQualityAPI.getCurrentAirQuality(city);
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, enabled]);

  return { data, loading, error };
};

/**
 * Custom hook for fetching trend data
 * @param {string} city - City name
 * @param {string} period - '24h' or '7d'
 * @param {boolean} enabled - Whether to fetch data
 * @returns {Object} Trend data, loading state, and error
 */
export const useTrendData = (city, period = "24h", enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !enabled) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result =
          period === "24h"
            ? await airQualityAPI.get24HourTrend(city)
            : await airQualityAPI.get7DayHistory(city);
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, period, enabled]);

  return { data, loading, error };
};
