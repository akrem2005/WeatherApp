import React, { useState, useEffect } from "react";
import "./App.css";
import { WiDaySunny } from "weather-icons-react";
import { WiCloudy } from "weather-icons-react";
import { WiRain } from "weather-icons-react";
import { WiSnow } from "weather-icons-react";
import { IoMdSnow } from "react-icons/io";
import { IoIosRainy } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { IoIosCloudy } from "react-icons/io";

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
          `https://api.openweathermap.org/data/2.5/weather?q=Addis%20Ababa,%20Ethiopia&units=metric&appid=f5459c6a66009cf0527119550bc33d0d`
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

  const getWeatherIcon = () => {
    const weatherMain = weatherData.weather[0].main.toLowerCase();

    switch (weatherMain) {
      case "clear":
        return <IoIosSunny size={64} />;
      case "clouds":
        return <IoIosCloudy size={64} />;
      case "rain":
        return <IoIosRainy size={64} />;
      case "snow":
        return <IoMdSnow size={64} />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="weather-card">
          <h2 className="location">{weatherData.name}</h2>
          <div className="weather-info">
            <div className="weather-icon">{getWeatherIcon()}</div>
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="description">{weatherData.weather[0].description}</p>
            <p className="additional-info">
              <span>Humidity:</span> {weatherData.main.humidity}%
            </p>
            <p className="additional-info">
              <span>Wind Speed:</span> {weatherData.wind.speed} m/s
            </p>
            <p className="additional-info">
              <span>Pressure:</span> {weatherData.main.pressure} hPa
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
