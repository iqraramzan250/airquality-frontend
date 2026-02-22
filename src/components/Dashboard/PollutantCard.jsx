import { useMemo } from "react";
import { formatPollutantName, getPollutantUnit } from "../../utils/aqiUtils";
import { Wind, Droplets, Cloud, Zap } from "lucide-react";

// Icon mapping outside component to avoid creating during render
const POLLUTANT_ICONS = {
  pm25: Droplets,
  pm10: Droplets,
  co: Wind,
  no2: Cloud,
  o3: Zap,
  so2: Cloud,
};

const PollutantCard = ({ pollutant, value, unit }) => {
  const name = useMemo(() => formatPollutantName(pollutant), [pollutant]);
  const defaultUnit = useMemo(() => getPollutantUnit(pollutant), [pollutant]);
  const displayUnit = unit || defaultUnit;

  // Simple color based on value (this is simplified - real AQI calculation would be more complex)
  const getColor = (val) => {
    if (val < 50) return "text-green-500";
    if (val < 100) return "text-yellow-500";
    if (val < 150) return "text-orange-500";
    return "text-red-500";
  };

  const Icon = useMemo(() => {
    return POLLUTANT_ICONS[pollutant.toLowerCase()] || Wind;
  }, [pollutant]);

  return (
    <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/15 dark:hover:bg-gray-800/15 transition-all shadow-lg hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              {name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {displayUnit}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className={`text-3xl font-bold ${getColor(value)}`}>
          {value !== null && value !== undefined ? value.toFixed(1) : "--"}
        </div>
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              value < 50
                ? "bg-green-500"
                : value < 100
                  ? "bg-yellow-500"
                  : value < 150
                    ? "bg-orange-500"
                    : "bg-red-500"
            }`}
            style={{
              width: `${Math.min((value / 200) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PollutantCard;
