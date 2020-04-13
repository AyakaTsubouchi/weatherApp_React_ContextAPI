import React, { Component } from 'react';
import axios from 'axios';

import Weather from './weather/Wather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
      </div>
    );
  }
}

export default App;
