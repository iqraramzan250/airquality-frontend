/**
 * Mock data generator for testing purposes
 * Remove this file when connecting to real API
 */

export const generateMockAirQualityData = (city) => {
  const baseAQI = Math.floor(Math.random() * 200) + 20; // AQI between 20-220

  return {
    city,
    aqi: baseAQI,
    timestamp: new Date().toISOString(),
    pm25: parseFloat((baseAQI * 0.8 + Math.random() * 20).toFixed(1)),
    pm10: parseFloat((baseAQI * 1.2 + Math.random() * 30).toFixed(1)),
    co: parseFloat((baseAQI * 0.1 + Math.random() * 2).toFixed(2)),
    no2: parseFloat((baseAQI * 0.5 + Math.random() * 15).toFixed(1)),
    o3: parseFloat((baseAQI * 0.6 + Math.random() * 20).toFixed(1)),
    so2: parseFloat((baseAQI * 0.3 + Math.random() * 10).toFixed(1)),
  };
};

export const generateMockTrendData = (period = "24h") => {
  const now = new Date();
  const timestamps = [];
  const values = [];

  const count = period === "24h" ? 24 : 7;
  const interval = period === "24h" ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * interval);
    timestamps.push(timestamp.toISOString());
    // Generate realistic AQI values with some variation
    const baseValue = 50 + Math.sin((i / count) * Math.PI * 2) * 30;
    const value = Math.max(
      20,
      Math.min(250, baseValue + (Math.random() - 0.5) * 20),
    );
    values.push(Math.round(value));
  }

  return {
    timestamps,
    values,
  };
};
