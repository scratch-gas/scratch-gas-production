import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Home from './components/Home.js';
import SingleRepo from './components/SingleRepo.js';
import PublicRepo from './components/PublicRepo.js';


class App extends Component {
  render() {
    return (
      <Router> 
        <Switch>
          <Route path="/" component={Login} /> 
          <Route path="/home" component={Home} />
          <Route path="/repo/:id" component={SingleRepo} />
          <Route path="/repo/public/:id" component={PublicRepo} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

module.exports = { ReactDOM, App };