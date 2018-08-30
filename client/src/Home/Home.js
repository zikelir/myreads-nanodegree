import React from 'react';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading.js';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <CurrentlyReading />
      </div>
    );
  }
}

export default Home;