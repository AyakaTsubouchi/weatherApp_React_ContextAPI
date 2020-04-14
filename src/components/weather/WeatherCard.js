import React, { Component } from 'react';
import citylist from './citylist.json';
import AppContext from '../context';

//icon
import Clear from './icon/day-and-night.svg';
import Clouds from './icon/cloud.svg';
import Rain from './icon/umbrella.svg';
import Snow from './icon/snow.svg';
import Extream from './icon/flash.svg';

class WeatherCard extends Component {
  state = {
    city: '',
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value.toLowerCase(),
    });
    console.log(this.state.city);
  };

  handleClick = () => {
    //check if the input city name is vallid or not
    let flag = 0;
    citylist.map((item) => {
      if (item.name.toLowerCase() === this.state.city) {
        flag = 1;
      }
    });
    if (flag === 0) {
      alert(
        "I'm sorry. I couldn't find the ciry name in our dictionary. Please try different name."
      );
    } else {
      this.props.getWeatherByCity(this.state.city);
    }
  };
  weatherIcon = (weather) => {
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
  render() {
    return (
      <AppContext.Consumer>
        {(weatherData) => (
          <div className="container">
            <div className="app-title">
              <p>Weather App</p>
            </div>
            <div className="form">
              <input
                type="text"
                placeholder="Vancouver"
                onChange={this.handleChange}
                value={this.state.city}
              />
              <button onClick={this.handleClick}>GET WEATHER</button>
            </div>
            <div className="weather-container">
              <div className="description">
                <p>{weatherData.city}</p>
              </div>
              <div className="weather-icon">
                <img src={this.weatherIcon(weatherData.weather)} />
              </div>

              <div className="temperature-value">
                <p>
                  {weatherData.temp
                    ? Math.round(weatherData.temp - 273.15)
                    : null}
                  °<span>C</span>
                </p>
              </div>
              <div className="description">
                <p>{weatherData.description}</p>
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default WeatherCard;
