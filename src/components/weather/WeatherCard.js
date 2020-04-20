import React, { useContext } from 'react';
import citylist from './citylist.json';
import WeatherContext from '../context';

//icon
import Clear from './icon/day-and-night.svg';
import Clouds from './icon/cloud.svg';
import Rain from './icon/umbrella.svg';
import Snow from './icon/snow.svg';
import Extream from './icon/flash.svg';

const WeatherCard = (props) => {
  //here, I tried to use it, but it doesn't work.
  // const { city, setCity } = useState('vancouver');
  const [weather, setWeather] = useContext(WeatherContext);
  // const weatherData = useContext(AppContext);

  const handleChange = (e) => {
    setWeather({
      ...weather,
      city: e.target.value.toLowerCase(),
    });
  };

  const handleClick = () => {
    //check if the input city name is vallid or not
    let flag = 0;
    citylist.map((item) => {
      if (item.name.toLowerCase() === weather.city) {
        flag = 1;
      }
    });
    if (flag === 0) {
      alert(
        "I'm sorry. I couldn't find the ciry name in our dictionary. Please try different name."
      );
    } else {
      props.getWeatherByCity(weather.city);
    }
  };

  const weatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return Clear;
      case 'Rain':
        return Rain;
      case 'Clouds':
        return Clouds;
      case 'Snow':
        return Snow;
      case 'Extreme':
        return Extream;

      default:
        return Clouds;
    }
  };

  return (
    <div className="container">
      <>
        <div className="app-title">
          <p>Weather App</p>
        </div>
        <div className="form">
          <input
            type="text"
            placeholder="Vancouver"
            onChange={handleChange}
            value={weather.city}
          />
          <button onClick={handleClick}>GET WEATHER</button>
        </div>
        <div className="weather-container">
          <div className="description">
            <p>{weather.city}</p>
          </div>
          <div className="weather-icon">
            <img alt="weather icon" src={weatherIcon(props.weather)} />
          </div>

          <div className="temperature-value">
            <p>
              {props.temp ? Math.round(props.temp - 273.15) : null}°
              <span>C</span>
            </p>
          </div>
          <div className="description">
            <p>{props.description}</p>
          </div>
        </div>
      </>
    </div>
  );
};
export default WeatherCard;
