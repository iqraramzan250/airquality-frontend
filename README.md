# Real-Time Air Quality Monitoring Dashboard

A modern, professional React application for monitoring air quality data in real-time. Built with React, Vite, Tailwind CSS, and Chart.js.

## Features

- 🌍 **Real-Time Air Quality Monitoring** - Search and view air quality data for any city
- 📊 **Interactive Charts** - 24-hour trends and 7-day history visualization
- 🔄 **City Comparison** - Compare air quality between two cities side-by-side
- 🎨 **Modern UI/UX** - Glassmorphism design with dark/light mode support
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast development

## Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Beautiful, responsive charts
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Charts/         # Chart components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Layout/         # Layout components (Sidebar, Navbar)
│   └── SearchBar/      # Search functionality
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── utils/              # Utility functions
├── views/              # Page components
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## API Configuration

The app is configured to connect to a backend API at `http://localhost:5000/api`.

### API Endpoints Expected

- `GET /api/air-quality/:city` - Get current air quality for a city
- `GET /api/air-quality/:city/trend/24h` - Get 24-hour trend data
- `GET /api/air-quality/:city/history/7d` - Get 7-day history
- `GET /api/air-quality/compare?city1=:city1&city2=:city2` - Compare two cities

### Mock Data Mode

If the backend API is not available, the app will automatically fall back to mock data for testing purposes. This allows you to test the UI without a backend.

To force mock data mode, create a `.env` file:

```
VITE_USE_MOCK_DATA=true
```

### Expected API Response Format

**Current Air Quality:**

```json
{
  "city": "New York",
  "aqi": 75,
  "timestamp": "2026-02-06T14:30:00Z",
  "pm25": 25.5,
  "pm10": 45.2,
  "co": 0.8,
  "no2": 35.0,
  "o3": 60.5,
  "so2": 12.3
}
```

**Trend Data:**

```json
{
  "timestamps": ["2026-02-06T00:00:00Z", ...],
  "values": [65, 70, 75, ...]
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run clean` - Clean build artifacts

## Features Overview

### Dashboard

- Search for any city to view air quality data
- Large AQI gauge with color-coded categories
- Pollutant cards showing PM2.5, PM10, CO, NO₂, O₃, SO₂
- Health recommendations based on AQI levels
- 24-hour and 7-day trend charts

### Trends

- View detailed air quality trends
- 24-hour hourly data visualization
- 7-day historical data

### Comparison

- Compare air quality between two cities
- Side-by-side AQI gauges
- Pollutant level comparison

### Settings

- Toggle dark/light mode
- Configure notifications
- Set auto-refresh intervals

## Styling

The app uses Tailwind CSS with a custom glassmorphism theme. Dark mode is supported and can be toggled in settings or follows system preferences.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

MIT

## Author

Built with ❤️ using React and modern web technologies.
