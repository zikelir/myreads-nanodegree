import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main/Main.js';
import './index.scss';

ReactDOM.render(
    <BrowserRouter>
      <Main/>
    </BrowserRouter>,
  document.getElementById('root'));