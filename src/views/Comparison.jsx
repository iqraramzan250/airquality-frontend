import { useState } from "react";
import AQIGauge from "../components/Dashboard/AQIGauge";
import PollutantCard from "../components/Dashboard/PollutantCard";
import { useCompareCities } from "../hooks/useAirQuality";
import { GitCompare, AlertCircle } from "lucide-react";

const Comparison = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [submitted1, setSubmitted1] = useState("");
  const [submitted2, setSubmitted2] = useState("");

  const { data, loading, error } = useCompareCities(submitted1, submitted2);

  const handleCompare = () => {
    const c1 = input1.trim();
    const c2 = input2.trim();
    if (c1 && c2 && c1 !== c2) {
      setSubmitted1(c1);
      setSubmitted2(c2);
    }
  };

  const pollutants = (record) =>
    record
      ? [
          { name: "pm25", value: Number.parseFloat(record.pm25) || 0 },
          { name: "pm10", value: Number.parseFloat(record.pm10) || 0 },
          { name: "co", value: Number.parseFloat(record.co) || 0 },
          { name: "no2", value: Number.parseFloat(record.no2) || 0 },
          { name: "o3", value: Number.parseFloat(record.o3) || 0 },
          { name: "so2", value: Number.parseFloat(record.so2) || 0 },
        ]
      : [];

  const canCompare = input1.trim() && input2.trim() && input1.trim() !== input2.trim();

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

      {/* Search inputs and Compare button */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="compare-city1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City 1
          </label>
          <input
            id="compare-city1"
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCompare()}
            placeholder="e.g. London"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label htmlFor="compare-city2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City 2
          </label>
          <input
            id="compare-city2"
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCompare()}
            placeholder="e.g. New York"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
      <div className="mb-8">
        <button
          onClick={handleCompare}
          disabled={!canCompare || loading}
          className="w-full lg:w-auto px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Loading..." : "Compare"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading comparison...
          </p>
        </div>
      )}

      {data && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {data.city1?.city ?? submitted1}
            </h2>
            <AQIGauge aqi={data.city1?.aqi} city={data.city1?.city} />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pollutants(data.city1).map((p) => (
                <PollutantCard
                  key={p.name}
                  pollutant={p.name}
                  value={p.value}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {data.city2?.city ?? submitted2}
            </h2>
            <AQIGauge aqi={data.city2?.aqi} city={data.city2?.city} />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pollutants(data.city2).map((p) => (
                <PollutantCard
                  key={p.name}
                  pollutant={p.name}
                  value={p.value}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!data && !loading && !error && (
        <div className="text-center py-16">
          <div className="inline-block p-6 rounded-full bg-blue-500/10 mb-4">
            <GitCompare className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Compare Air Quality
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter two cities above and click Compare to see side-by-side air
            quality
          </p>
        </div>
      )}
    </div>
  );
};

export default Comparison;
