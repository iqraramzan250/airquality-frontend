export const calculateAQI = (concentration, breakpoints) => {
  const [cLow, cHigh, iLow, iHigh] = breakpoints;
  const aqi = ((iHigh - iLow) / (cHigh - cLow)) * (concentration - cLow) + iLow;
  return Math.round(aqi);
};

export const getAQICategory = (aqi) => {
  if (aqi <= 50) {
    return {
      category: "Good",
      color: "#10b981",
      bgColor: "bg-green-500",
      textColor: "text-green-500",
      description: "Air quality is satisfactory",
    };
  } else if (aqi <= 100) {
    return {
      category: "Moderate",
      color: "#f59e0b",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
      description: "Acceptable for most people",
    };
  } else if (aqi <= 150) {
    return {
      category: "Unhealthy for Sensitive Groups",
      color: "#f97316",
      bgColor: "bg-orange-500",
      textColor: "text-orange-500",
      description: "Members of sensitive groups may experience health effects",
    };
  } else if (aqi <= 200) {
    return {
      category: "Unhealthy",
      color: "#ef4444",
      bgColor: "bg-red-500",
      textColor: "text-red-500",
      description: "Everyone may begin to experience health effects",
    };
  } else if (aqi <= 300) {
    return {
      category: "Very Unhealthy",
      color: "#8b5cf6",
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
      description:
        "Health alert: everyone may experience serious health effects",
    };
  } else {
    return {
      category: "Hazardous",
      color: "#7f1d1d",
      bgColor: "bg-red-900",
      textColor: "text-red-900",
      description: "Health warning of emergency conditions",
    };
  }
};

export const getHealthRecommendation = (aqi) => {
  if (aqi <= 50) {
    return {
      message: "Air quality is good. Enjoy outdoor activities!",
      icon: "✅",
      severity: "good",
    };
  } else if (aqi <= 100) {
    return {
      message:
        "Air quality is acceptable. Sensitive individuals should consider reducing outdoor activities.",
      icon: "⚠️",
      severity: "moderate",
    };
  } else if (aqi <= 150) {
    return {
      message:
        "Sensitive groups should reduce outdoor activities. Consider wearing a mask.",
      icon: "😷",
      severity: "caution",
    };
  } else if (aqi <= 200) {
    return {
      message:
        "Everyone should avoid prolonged outdoor activities. Wear a mask if going outside.",
      icon: "😷",
      severity: "unhealthy",
    };
  } else if (aqi <= 300) {
    return {
      message:
        "Stay indoors. Avoid outdoor activities. Use air purifiers if available.",
      icon: "🚨",
      severity: "very-unhealthy",
    };
  } else {
    return {
      message:
        "EMERGENCY: Stay indoors. Close windows. Use air purifiers. Avoid all outdoor activities.",
      icon: "🚨",
      severity: "hazardous",
    };
  }
};

export const formatPollutantName = (pollutant) => {
  const names = {
    pm25: "PM2.5",
    pm10: "PM10",
    co: "CO",
    no2: "NO₂",
    o3: "O₃",
    so2: "SO₂",
  };
  return names[pollutant.toLowerCase()] || pollutant.toUpperCase();
};

export const getPollutantUnit = (pollutant) => {
  const units = {
    pm25: "μg/m³",
    pm10: "μg/m³",
    co: "ppm",
    no2: "ppb",
    o3: "ppb",
    so2: "ppb",
  };
  return units[pollutant.toLowerCase()] || "";
};
