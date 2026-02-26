import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const WeatherChart = ({ data, title, period = "24h" }) => {
  const chartData = useMemo(() => {
    if (!data || !data.timestamps || !data.values) {
      return null;
    }

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      if (period === "24h") {
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    };

    const labels = data.timestamps.map(formatTime);
    const values = data.values;

    const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
    let gradientColor = "rgba(59, 130, 246, 0.5)";
    let borderColor = "rgba(59, 130, 246, 1)";

    if (avgValue > 150) {
      gradientColor = "rgba(239, 68, 68, 0.5)";
      borderColor = "rgba(239, 68, 68, 1)";
    } else if (avgValue > 100) {
      gradientColor = "rgba(249, 115, 22, 0.5)";
      borderColor = "rgba(249, 115, 22, 1)";
    } else if (avgValue > 50) {
      gradientColor = "rgba(234, 179, 8, 0.5)";
      borderColor = "rgba(234, 179, 8, 1)";
    }

    return {
      labels,
      datasets: [
        {
          label: "AQI",
          data: values,
          borderColor: borderColor,
          backgroundColor: gradientColor,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: borderColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [data, period]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (context) => `AQI: ${context.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "rgba(156, 163, 175, 0.8)",
            font: {
              size: 11,
            },
          },
          border: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        y: {
          beginAtZero: true,
          max: 500,
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
          ticks: {
            color: "rgba(156, 163, 175, 0.8)",
            font: {
              size: 11,
            },
          },
          border: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    }),
    [],
  );

  if (!chartData) {
    return (
      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20 h-64 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {title}
      </h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
