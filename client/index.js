import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Home from '/components/Home.js';
import SingleRepo from '/components/SingleRepo.js';
import PublicRepo from '/components/PublicRepo.js';


class App extends Component {
  render() {
    return (
      <Router> 
        <Switch>
          <Route path="/" component={Login} /> 
          <Route path="/home" component={Home} />
          <Router path={"/repo/:id"} component={SingleRepo} />
          <Router path={"/repo/public/:id"} component={PublicRepo} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
