import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateRoute from './component/forms/CreateRoute';
import CreateStops from './component/forms/CreateStops';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route exact path="routes" element={<CreateRoute />} />
      <Route exact path="stops" element={<CreateStops />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

