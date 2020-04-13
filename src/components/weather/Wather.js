import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import sampleForecas from './forecasSample.json';
import AppContext from '../context';

class Weather extends Component {
  // state = {
  //   tempMax: '',
  //   tempMin: '',
  //   city: '',
  //   country: '',
  //   humidity: '',
  //   description: '',
  //   error: '',
  //   fDate: '',
  //   forecastRes: [],
  // };
  constructor() {
    super();
    this.state = {
      name: '',
      response: [],
    };
  }

  componentDidMount() {
    // this.getWeatherByGeo();
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
          // tempMax: response.main.temp_max,
          // tempMin: response.main.temp_min,
          // city: response.name,
          // country: response.sys.country,
          // humidity: response.main.humidity,
          // description: response.weather[0].description,
          // error: '',
          //forecastRes: [],
          response,
        });
        console.log(this.state);
      });
    } else {
      console.log('geolocation IS NOT available');
    }
  };

  getWeatherByCity = async (propCity) => {
    //if form value is not null

    //current weather
    const city = propCity;
    const API_KEY = 'a9d26cdce59f235872922cf298bfdd24';
    const CurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const apiCall = await fetch(CurrentURL);
    if (apiCall.status !== 200) console.log('something wrong');

    const response = await apiCall.json();
    console.log(response);

    this.setState({
      tempMax: response.main.temp_max,
      tempMin: response.main.temp_min,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      error: '',
      forecastRes: [],
    });
    //forecast

    const ForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    const forecastAPI = await fetch(ForecastURL);
    if (forecastAPI.status !== 200) console.log('something wrong');
    const forecastRes = await forecastAPI.json();
    this.setState({
      forecastRes: forecastRes,
    });
    console.log('focastcity', forecastRes);
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <button onClick={this.getWeatherByCity}>CLICK</button>
        {/* <AppContext.Provider value={{ state: this.state }}> */}
        <AppContext.Provider value={this.state.response}>
          <WeatherCard
            description={this.state.description}
            getWeatherByCity={this.getWeatherByCity}
          />
        </AppContext.Provider>
      </div>
    );
  }
}
export default Weather;
