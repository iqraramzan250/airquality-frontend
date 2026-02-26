import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import AQIGauge from "../components/Dashboard/AQIGauge";
import PollutantCard from "../components/Dashboard/PollutantCard";
import HealthRecommendation from "../components/Dashboard/HealthRecommendation";
import WeatherChart from "../components/Charts/WeatherChart";
import { useAirQuality, useTrendData } from "../hooks/useAirQuality";
import { STORAGE_KEYS } from "../utils/constants";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [currentCity, setCurrentCity] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(STORAGE_KEYS.LAST_CITY) || "";
    }
    return "";
  });

  const { data: airQualityData, loading, error } = useAirQuality(currentCity);
  const { data: trend24h } = useTrendData(currentCity, "24h");
  const { data: trend7d } = useTrendData(currentCity, "7d");

  const handleSearch = (searchCity) => {
    const city = searchCity.trim();
    if (city) {
      setCurrentCity(city);
      window.localStorage.setItem(STORAGE_KEYS.LAST_CITY, city);
    }
  };

  const pollutants = [
    { name: "pm25", value: Number.parseFloat(airQualityData?.pm25) || 0 },
    { name: "pm10", value: Number.parseFloat(airQualityData?.pm10) || 0 },
    { name: "co", value: Number.parseFloat(airQualityData?.co) || 0 },
    { name: "no2", value: Number.parseFloat(airQualityData?.no2) || 0 },
    { name: "o3", value: Number.parseFloat(airQualityData?.o3) || 0 },
    { name: "so2", value: Number.parseFloat(airQualityData?.so2) || 0 },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Real-Time Air Quality Monitor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Track air quality data for any city worldwide
          </p>
        </div>
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          placeholder="Enter city name (e.g., New York, London, Tokyo)..."
          initialValue={currentCity}
        />
      </div>

      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading air quality data...
          </p>
        </div>
      )}

      {airQualityData && !loading && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AQIGauge aqi={airQualityData.aqi} city={currentCity} />
            <HealthRecommendation aqi={airQualityData.aqi} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Pollutant Levels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pollutants.map((pollutant) => (
                <PollutantCard
                  key={pollutant.name}
                  pollutant={pollutant.name}
                  value={pollutant.value}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeatherChart data={trend24h} title="24-Hour Trend" period="24h" />
            <WeatherChart data={trend7d} title="7-Day History" period="7d" />
          </div>
        </>
      )}

      {!airQualityData && !loading && !error && (
        <div className="text-center py-16">
          <div className="inline-block p-6 rounded-full bg-blue-500/10 mb-4">
            <AlertCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Search for a city to get started
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a city name above to view real-time air quality data
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
