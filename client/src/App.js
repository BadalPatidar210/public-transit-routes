import React from 'react';
import './App.css';
import RouteView from './component/RouteView';

function App() {

  return (
    <div className='home-page'>
      <nav>
        <div className='nav-bar'>
          <h5>Routes View</h5>
        </div>
      </nav>
      <RouteView />
    </div >
  );
}

export default App;
