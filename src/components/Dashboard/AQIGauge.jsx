import { useMemo } from "react";
import { getAQICategory } from "../../utils/aqiUtils";

const AQIGauge = ({ aqi, city }) => {
  const category = useMemo(() => getAQICategory(aqi || 0), [aqi]);

  // Calculate percentage for circular progress (0-100)
  const percentage = useMemo(() => {
    if (!aqi) return 0;
    // Normalize AQI to 0-100% (assuming max AQI is 500)
    return Math.min((aqi / 500) * 100, 100);
  }, [aqi]);

  // Calculate stroke-dashoffset for SVG circle
  const circumference = 2 * Math.PI * 90; // radius = 90
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {city ? `${city} - Air Quality Index` : "Air Quality Index"}
        </h3>

        {/* Circular Gauge */}
        <div className="relative w-64 h-64 mb-6">
          <svg
            className="transform -rotate-90 w-full h-full"
            viewBox="0 0 200 200"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={category.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-6xl font-bold"
              style={{ color: category.color }}
            >
              {aqi || "--"}
            </div>
            <div
              className="text-lg font-semibold mt-2"
              style={{ color: category.color }}
            >
              {category.category}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {category.description}
        </p>
      </div>
    </div>
  );
};

export default AQIGauge;
