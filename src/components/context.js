import React, { useState, createContext } from 'react';

export const WeatherContext = createContext(null);
export const WeatherProvider = (props) => {
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    weather: null,
    description: null,
  });
  //   const { temp, setTemp } = useState('ff');
  //   const { city, setCity } = useState('vancouver');
  //   const { weather, setWeather } = useState('');
  //   const { description, setDescription } = useState('');
  return (
    <WeatherContext.Provider
      value={
        [weather, setWeather]
        // ({ temp, setTemp },
        // { city, setCity },
        // { weather, setWeather },
        // { description, setDescription })
      }>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
