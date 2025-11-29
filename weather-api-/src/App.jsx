// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SuggestionsList from "./components/SuggestionsList";
import WeatherSummary from "./components/WeatherSummary";
import HourlyForecastGrid from "./components/HourlyForecastGrid";

function App() {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({
    name: "Baghdad",
    country: "Iraq",
    latitude: 33.3,
    longitude: 44.4,
    timezone: "Asia/Baghdad",
  });
  const [query, setQuery] = useState("Baghdad");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherForPlace = async (place) => {
    const { latitude, longitude, timezone, name, country } = place;

    setLocation({
      name,
      country,
      latitude,
      longitude,
      timezone,
    });

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      "&hourly=temperature_2m" +
      `&timezone=${encodeURIComponent(timezone)}`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherRes.json();

    const times = weatherData.hourly?.time?.slice(0, 12) ?? [];
    const temps = weatherData.hourly?.temperature_2m?.slice(0, 12) ?? [];

    const combined = times.map((time, index) => ({
      time,
      temperature: temps[index],
    }));

    setForecast(combined);
  };

  const fetchLocationAndWeather = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      setForecast([]);
      setSuggestions([]);

      const geoUrl =
        "https://geocoding-api.open-meteo.com/v1/search" +
        `?name=${encodeURIComponent(searchTerm)}` +
        "&count=5&language=en&format=json";

      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error("Failed to fetch location data");
      }

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Location not found. Try another name.");
      }

      setSuggestions(geoData.results);

      const firstPlace = geoData.results[0];
      await fetchWeatherForPlace(firstPlace);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (searchTerm) => {
    const trimmed = searchTerm.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const geoUrl =
        "https://geocoding-api.open-meteo.com/v1/search" +
        `?name=${encodeURIComponent(trimmed)}` +
        "&count=5&language=en&format=json";

      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) return;

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setSuggestions([]);
        return;
      }

      setSuggestions(geoData.results);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchLocationAndWeather("Baghdad");
  }, []);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const hasData = !loading && !error && forecast.length > 0;

  const current = hasData ? forecast[0] : null;
  const minTemp = hasData
    ? Math.min(...forecast.map((item) => item.temperature))
    : null;
  const maxTemp = hasData
    ? Math.max(...forecast.map((item) => item.temperature))
    : null;

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchLocationAndWeather(query.trim());
  };

  const handleSuggestionClick = async (place) => {
    try {
      setLoading(true);
      setError(null);
      setForecast([]);

      await fetchWeatherForPlace(place);

      setQuery(
        place.country ? `${place.name}, ${place.country}` : place.name
      );
      setSuggestions([]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-2xl mx-4 rounded-2xl bg-slate-800/80 shadow-2xl border border-slate-700/80 p-6 md:p-8 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-slate-900/60">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-center tracking-tight">
          Weather App <span className="text-sky-400">Open-Meteo</span>
        </h1>

        <p className="text-sm text-slate-300 mb-4 text-center">
          Location:{" "}
          <span className="font-medium">
            {location.name}, {location.country}
          </span>{" "}
          <span className="text-slate-400">
            (lat {location.latitude.toFixed(2)}, lon{" "}
            {location.longitude.toFixed(2)})
          </span>
        </p>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSubmit}
        />

        <SuggestionsList
          suggestions={suggestions}
          loading={loading}
          onSelect={handleSuggestionClick}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <span className="h-8 w-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
            <p className="text-sm text-slate-200">Loading weather...</p>
          </div>
        )}

        {error && (
          <div className="mt-2 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3">
            <p className="text-sm text-red-200 font-medium">Error</p>
            <p className="text-xs text-red-200/80 mt-1">{error}</p>
          </div>
        )}

        {hasData && (
          <>
            <WeatherSummary
              current={current}
              minTemp={minTemp}
              maxTemp={maxTemp}
              formatTime={formatTime}
            />

            <HourlyForecastGrid
              forecast={forecast}
              formatTime={formatTime}
            />
          </>
        )}

        <p className="mt-6 text-[11px] text-center text-slate-500">
          Data powered by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            Open-Meteo API
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
