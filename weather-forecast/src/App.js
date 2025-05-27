import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard";


function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod === 200) {
      setWeather(data);
    } else {
      setWeather(null);
      alert("City not found!");
    }
  };
  
  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
