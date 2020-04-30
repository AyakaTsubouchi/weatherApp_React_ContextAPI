import React, { useState, createContext } from 'react';

const WeatherContext = createContext(null);
export const WeatherProvider = (props) => {
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    weather: null,
    description: null,
  });

  return (
    <WeatherContext.Provider value={[weather, setWeather]}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
