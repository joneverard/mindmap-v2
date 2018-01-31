import React, { Component } from 'react';
// import './style/App.css';
import Ribbon from './components/ribbon';
import MindMap from './containers/mindmap';
// this is where to build the app...

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ribbon />
        <MindMap />
      </div>
    );
  }
}

export default App;
