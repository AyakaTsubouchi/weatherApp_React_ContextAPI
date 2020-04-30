import React, { useState, useEffect, useContext } from 'react';
import WeatherCard from './WeatherCard';
import WeatherContext from '../context';

//here is the component to get weather info
// so let's see what's going on
const Weather = () => {
  const [weather, setWeather] = useContext(WeatherContext);

  useEffect(() => {
    getWeatherByGeo();
  }, []);

  //for geolocation error
  const error = () => {
    console.log('error');
    getWeatherByCity('Vancouver');
  };
  //get the current weather info by geolocation
  const getWeatherByGeo = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const API_KEY = process.env.REACT_APP_OWM_API;

        const GeoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        const apiCall = await fetch(GeoURL);
        if (apiCall.status !== 200) console.log('something wrong');

        const response = await apiCall.json();

        setWeather({
          ...weather,
          temp: response.main.temp,
          city: response.name,
          weather: response.weather[0].main,
          description: response.weather[0].description,
        });

        console.log(weather.temp);
      }, error);
    } else {
      console.log('search by default city');
      getWeatherByCity('Vancouver');
    }
  };

  const getWeatherByCity = async (city) => {
    const API_KEY = process.env.REACT_APP_OWM_API;
    const CurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const apiCall = await fetch(CurrentURL);
    if (apiCall.status !== 200) console.log('something wrong');

    const response = await apiCall.json();
    setWeather({
      ...weather,
      temp: response.main.temp,
      city: response.name,
      weather: response.weather[0].main,
      description: response.weather[0].description,
    });
  };

  return (
    <div>
      <WeatherCard
        getWeatherByCity={getWeatherByCity}
        temp={weather.temp}
        city={weather.city}
        weather={weather.weather}
        description={weather.description}
      />

      <div className="copy-right">
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons">
          Smashicons
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {' '}
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};
// }
export default Weather;
