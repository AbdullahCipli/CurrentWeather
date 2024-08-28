import React, { useState } from 'react';
import './App.css';

const weatherDescriptions = {
  "clear sky": "Açık Hava",
  "few clouds": "Az Bulutlu",
  "scattered clouds": "Parçalı Bulutlu",
  "broken clouds": "Çok Bulutlu",
  "shower rain": "Sağanak Yağışlı",
  "rain": "Yağmurlu",
  "thunderstorm": "Gök Gürültülü Fırtına",
  "snow": "Karlı",
  "mist": ",Sisli",
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Hata", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      });
    } else {
      alert("Hata");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Anlık Hava Durumu</h1>
        <button className="weather-button" onClick={getLocation}>Hava Durumunu Görüntüle</button>
        {weatherData && weatherData.weather && weatherData.weather[0] && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>{weatherDescriptions[weatherData.weather[0].description] || weatherData.weather[0].description}</p>
            <p>Sıcaklık: {weatherData.main.temp}°C</p>
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              alt={weatherData.weather[0].description} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
