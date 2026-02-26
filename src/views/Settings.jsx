import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Bell } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Settings
          </h1>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-3 mb-4">
            {darkMode ? (
              <Moon className="w-5 h-5 text-blue-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Appearance
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Dark Mode
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle dark/light theme
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div> */}

        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Enable Notifications
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get alerts for air quality changes
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Data Refresh
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Auto Refresh
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically update air quality data
                </p>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRefresh ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRefresh ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {autoRefresh && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Refresh Interval: {refreshInterval} minutes
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            )}
          </div>
        </div> */}

        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            About
          </h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              <strong>API Base URL:</strong> http://localhost:5000/api
            </p>
            <p className="pt-4">
              Real-Time Air Quality Monitoring Dashboard built with React, Vite,
              Tailwind CSS, and Chart.js.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
