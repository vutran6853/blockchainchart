import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Pool from './components/pool/pool';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard/>
        <Pool/>
      </div>
    );
  }
}

export default App;
