import { useState, useEffect } from "react";
import { airQualityAPI } from "../services/api";

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

export const useCompareCities = (city1, city2, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const c1 = city1?.trim();
    const c2 = city2?.trim();
    if (!c1 || !c2 || c1 === c2 || !enabled) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await airQualityAPI.compareCities(c1, c2);
        setData(result);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city1, city2, enabled]);

  return { data, loading, error };
};
