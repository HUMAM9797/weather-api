// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const latitude = 33.3;
    const longitude = 44.4;

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&hourly=temperature_2m` +
      `&timezone=auto`;

    const fetchWeather = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await res.json();
        console.log("Weather data:", data);

        const firstTemp = data.hourly?.temperature_2m?.[0];
        const firstTime = data.hourly?.time?.[0];

        setWeather({
          time: firstTime,
          temperature: firstTemp,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md mx-4 rounded-2xl bg-slate-800/80 shadow-xl border border-slate-700 p-6">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Weather App <span className="text-sky-400">Open-Meteo</span>
        </h1>
        <p className="text-sm text-slate-300 mb-6 text-center">
          Location: <span className="font-medium">Baghdad</span>{" "}
          <span className="text-slate-400">(lat 33.3, lon 44.4)</span>
        </p>

        {loading && (
          <div className="flex items-center justify-center py-6">
            <span className="h-5 w-5 rounded-full border-2 border-sky-400 border-t-transparent animate-spin mr-2" />
            <p className="text-sm text-slate-200">Loading weather...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/40 px-4 py-3">
            <p className="text-sm text-red-200 font-medium">Error</p>
            <p className="text-xs text-red-200/80 mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && weather && (
          <div className="mt-4 rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Time</span>
              <span className="text-sm font-mono text-slate-100">
                {weather.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Temperature</span>
              <span className="text-2xl font-semibold text-sky-400">
                {weather.temperature}°C
              </span>
            </div>
          </div>
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
