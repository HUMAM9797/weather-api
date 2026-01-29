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
    <div className="app">
      <h1>Weather App - Open Meteo</h1>
      <p>Location: Baghdad (lat 33.3, lon 44.4)</p>

      {loading && <p>Loading weather...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && weather && (
        <div>
          <p><strong>Time:</strong> {weather.time}</p>
          <p><strong>Temperature:</strong> {weather.temperature} °C</p>
        </div>
      )}
    </div>
  );
}

export default App;
