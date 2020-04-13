import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import AppContext from '../context';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
    };
  }

  componentDidMount() {
    this.getWeatherByGeo();
  }

  getWeatherByGeo = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const API_KEY = process.env.REACT_APP_OWM_API;
        //currtent weather
        const CurrentURL = `https://api.openweathermap.org/data/2.5/weather?`;
        const byGeo = `${CurrentURL}lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        const apiCall = await fetch(byGeo);
        if (apiCall.status !== 200) console.log('something wrong');

        const response = await apiCall.json();

        this.setState({
          temp: response.main.temp,
          city: response.name,
          humidity: response.main.humidity,
          weather: response.weather[0].main,
          description: response.weather[0].description,
        });
        console.log(this.state);
      });
    } else {
      console.log('search default city');
      this.getWeatherByCity('Vancouver');
    }
  };

  getWeatherByCity = async (propCity) => {
    //if form value is not null

    //current weather
    const city = propCity;
    const API_KEY = process.env.REACT_APP_OWM_API;
    const CurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const apiCall = await fetch(CurrentURL);
    if (apiCall.status !== 200) console.log('something wrong');

    const response = await apiCall.json();
    console.log(response);

    this.setState({
      temp: response.main.temp,
      city: response.name,
      humidity: response.main.humidity,
      weather: response.weather[0].main,
      description: response.weather[0].description,
    });
  };

  render() {
    return (
      <div>
        <AppContext.Provider value={this.state}>
          <WeatherCard getWeatherByCity={this.getWeatherByCity} />
        </AppContext.Provider>
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
  }
}
export default Weather;
