import React, { Component } from 'react';
import { WeatherProvider } from './context';

import Weather from './weather/Wather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherProvider>
          <Weather />
        </WeatherProvider>
      </div>
    );
  }
}

export default App;
