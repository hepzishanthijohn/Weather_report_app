import React, { useState } from 'react';
import './Weather.css';

// Import icons from an icon library or use your own SVGs/PNG images
import { FaTemperatureHigh, FaWind, FaTint, FaCompress } from 'react-icons/fa';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apikey = "19a8470a463433487b03f8f82158f8e9";
  const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  const checkWeather = async () => {
    try {
      const response = await fetch(`${weatherApiUrl}${city}&appid=${apikey}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleSearch = () => {
    if (city) {
      checkWeather();
    } else {
      setError('Please enter a city');
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter the location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>

        <div className="contents">
          {error && <p className="error">{error}</p>}
          {weatherData && (
            <>
              <h2 className="location-name">{weatherData.name.toUpperCase()}</h2>
              <div id="imageItem">
                <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
              </div>
              <div className='weather-value'>
                <p>{weatherData.weather[0].description}</p>
              </div>
              <div className="weather-items">
                <p className='weather-item'>
                   <span>{Math.round(weatherData.main.temp)}°C</span><FaTemperatureHigh style={{color:"skyblue"}}/> Temperature
                </p>
                <p className='weather-item'>
                   <span>{weatherData.wind.speed} Km/h</span><FaWind style={{color:"skyblue"}}/> Wind Speed
                </p>
                <p className='weather-item'>
                   <span>{weatherData.main.humidity}%</span><FaTint style={{color:"skyblue"}}/> Humidity
                </p>
                <p className='weather-item'>
                   <span>{weatherData.main.pressure} hPa</span><FaCompress style={{color:"skyblue"}}/> Pressure
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
