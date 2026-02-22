import { useState } from "react";
import AQIGauge from "../components/Dashboard/AQIGauge";
import PollutantCard from "../components/Dashboard/PollutantCard";
import { useAirQuality } from "../hooks/useAirQuality";
import { GitCompare, AlertCircle } from "lucide-react";

const Comparison = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [currentCity1, setCurrentCity1] = useState("");
  const [currentCity2, setCurrentCity2] = useState("");

  const {
    data: data1,
    loading: loading1,
    error: error1,
  } = useAirQuality(currentCity1);
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useAirQuality(currentCity2);

  const handleSearch1 = (searchCity) => {
    setCurrentCity1(searchCity);
  };

  const handleSearch2 = (searchCity) => {
    setCurrentCity2(searchCity);
  };

  const pollutants1 = [
    { name: "pm25", value: parseFloat(data1?.pm25) || 0 },
    { name: "pm10", value: parseFloat(data1?.pm10) || 0 },
    { name: "co", value: parseFloat(data1?.co) || 0 },
    { name: "no2", value: parseFloat(data1?.no2) || 0 },
    { name: "o3", value: parseFloat(data1?.o3) || 0 },
    { name: "so2", value: parseFloat(data1?.so2) || 0 },
  ];

  const pollutants2 = [
    { name: "pm25", value: parseFloat(data2?.pm25) || 0 },
    { name: "pm10", value: parseFloat(data2?.pm10) || 0 },
    { name: "co", value: parseFloat(data2?.co) || 0 },
    { name: "no2", value: parseFloat(data2?.no2) || 0 },
    { name: "o3", value: parseFloat(data2?.o3) || 0 },
    { name: "so2", value: parseFloat(data2?.so2) || 0 },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <GitCompare className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Compare Cities
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compare air quality data between two cities side by side
        </p>
      </div>

      {/* Search Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City 1
          </label>
          <input
            type="text"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && city1.trim()) {
                handleSearch1(city1.trim());
              }
            }}
            placeholder="Enter first city..."
            className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            onClick={() => handleSearch1(city1)}
            disabled={loading1 || !city1.trim()}
            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading1 ? "Loading..." : "Search"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City 2
          </label>
          <input
            type="text"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && city2.trim()) {
                handleSearch2(city2.trim());
              }
            }}
            placeholder="Enter second city..."
            className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            onClick={() => handleSearch2(city2)}
            disabled={loading2 || !city2.trim()}
            className="mt-2 w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading2 ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {(error1 || error2) && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 dark:text-red-400">{error1 || error2}</p>
        </div>
      )}

      {/* Comparison Content */}
      {(data1 || data2) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* City 1 */}
          <div>
            {data1 && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {currentCity1}
                </h2>
                <AQIGauge aqi={data1.aqi} city={currentCity1} />
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pollutants1.map((pollutant) => (
                    <PollutantCard
                      key={pollutant.name}
                      pollutant={pollutant.name}
                      value={pollutant.value}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* City 2 */}
          <div>
            {data2 && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {currentCity2}
                </h2>
                <AQIGauge aqi={data2.aqi} city={currentCity2} />
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pollutants2.map((pollutant) => (
                    <PollutantCard
                      key={pollutant.name}
                      pollutant={pollutant.name}
                      value={pollutant.value}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data1 && !data2 && !loading1 && !loading2 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 rounded-full bg-blue-500/10 mb-4">
            <GitCompare className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Compare Air Quality
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter two cities above to compare their air quality data side by
            side
          </p>
        </div>
      )}
    </div>
  );
};

export default Comparison;
