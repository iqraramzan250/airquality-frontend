import { useMemo } from "react";
import { getHealthRecommendation, getAQICategory } from "../../utils/aqiUtils";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

const HealthRecommendation = ({ aqi }) => {
  const recommendation = useMemo(
    () => getHealthRecommendation(aqi || 0),
    [aqi],
  );
  const category = useMemo(() => getAQICategory(aqi || 0), [aqi]);

  const getSeverityStyles = () => {
    switch (recommendation.severity) {
      case "good":
        return "bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-300";
      case "moderate":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-300";
      case "caution":
        return "bg-orange-500/20 border-orange-500/30 text-orange-700 dark:text-orange-300";
      case "unhealthy":
        return "bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-300";
      case "very-unhealthy":
        return "bg-purple-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300";
      case "hazardous":
        return "bg-red-900/30 border-red-900/50 text-red-900 dark:text-red-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-700 dark:text-gray-300";
    }
  };

  const getIcon = () => {
    switch (recommendation.severity) {
      case "good":
        return <CheckCircle className="w-6 h-6" />;
      case "moderate":
      case "caution":
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  if (!aqi) {
    return null;
  }

  return (
    <div
      className={`rounded-xl p-6 border-2 backdrop-blur-lg ${getSeverityStyles()} transition-all shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">Health Recommendation</h3>
          <p className="text-sm leading-relaxed">{recommendation.message}</p>
          <div className="mt-3 flex items-center gap-2 text-xs opacity-75">
            <span className="font-semibold">AQI:</span>
            <span className="font-bold">{aqi}</span>
            <span className="mx-2">•</span>
            <span>{category.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendation;
