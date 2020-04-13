import React, { Component } from 'react';
import citylist from './citylist.json';

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
    let flag = 0;
    citylist.map((item) => {
      if (item.name.toLowerCase() === this.state.city) {
        flag = 1;
      }
    });
    if (flag === 0) {
      alert('try again');
    } else {
      alert("let's search");
      this.props.getWeatherByCity(this.state.city);
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder={this.props.city}
            onChange={this.handleChange}
            value={this.state.city}
          />
          <button onClick={this.handleClick}>GET WEATHER</button>
        </div>
        {/* <p>{this.props.city}</p> */}

        {/* <p>weather icon</p>

        <p>
          {this.props.tempMax}/{this.props.tempMin}
        </p>

        <p>{this.props.description}</p>

        <p>{this.props.humidity}</p> */}
      </div>
    );
  }
}

export default WeatherCard;
