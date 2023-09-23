import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data from API
    const fetchWeatherData = async () => {
      try {
        const apiKey = "YOUR_API_KEY";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=your-location&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error("Failed to fetch weather data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="weather-card">
          <h2 className="location">{weatherData.name}</h2>
          <div className="weather-info">
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="description">{weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
