import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login.js';
import Home from './components/Home.js';
import SingleRepo from './components/SingleRepo.js';
import PublicRepo from './components/PublicRepo.js';
import PrivateRoute from './components/PrivateRoute.js';


class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.setState({
      isAuth: false,
      err: ''
    });
  }

  login() {
    console.log(this.props);
    fetch('/auth/github')
    .then(resp => {
      
      if(resp.status === 200) {
        this.setState({
          isAuth: true,
          err: ''
        });
      } else if (resp.status === 401) {
        this.setState({
          isAuth: false,
          err: resp.json()
        });

      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Router> 
        <Switch>
          <Route path="/" render={ () => ( <Login login={this.login} />) } />
          <Route path="/repo" component={SingleRepo} />
          <Route path="/repo/public/:id" component={PublicRepo} />
          <PrivateRoute path="/home" component={Home} isAuth={this.state.isAuth} err={this.state.err} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
