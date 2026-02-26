import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherChart from "../components/Charts/WeatherChart";
import { useTrendData } from "../hooks/useAirQuality";
import { STORAGE_KEYS } from "../utils/constants";
import { TrendingUp, AlertCircle } from "lucide-react";

const Trends = () => {
  const [currentCity, setCurrentCity] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(STORAGE_KEYS.LAST_CITY) || "";
    }
    return "";
  });

  const {
    data: trend24h,
    loading: loading24h,
    error: error24h,
  } = useTrendData(currentCity, "24h");
  const {
    data: trend7d,
    loading: loading7d,
    error: error7d,
  } = useTrendData(currentCity, "7d");

  const loading = loading24h || loading7d;
  const error = error24h || error7d;

  const handleSearch = (searchCity) => {
    const city = searchCity.trim();
    if (city) {
      setCurrentCity(city);
      window.localStorage.setItem(STORAGE_KEYS.LAST_CITY, city);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Air Quality Trends
          </h1>
        </div>
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          placeholder="Enter city name to view trends..."
          initialValue={currentCity}
        />
      </div>

      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {currentCity && loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading trend data...
          </p>
        </div>
      )}

      {currentCity && !loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherChart data={trend24h} title="24-Hour Trend" period="24h" />
          <WeatherChart data={trend7d} title="7-Day History" period="7d" />
        </div>
      )}

      {!currentCity && (
        <div className="text-center py-16">
          <div className="inline-block p-6 rounded-full bg-blue-500/10 mb-4">
            <TrendingUp className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            View Air Quality Trends
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Search for a city to see 24-hour and 7-day air quality trends
          </p>
        </div>
      )}
    </div>
  );
};

export default Trends;
