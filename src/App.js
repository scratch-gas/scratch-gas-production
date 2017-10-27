import React, { Component } from 'react';
import Dir from './components/Dir.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Scratch</h1>
        This is the App Component
        <Dir />
      </div>
    );
  }
}

export default App;