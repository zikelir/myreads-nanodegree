import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header.js';
import Home from '../Home/Home.js';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <Route exact path="/" component={Home}/>
      </div>
    );
  }
}

export default Main;