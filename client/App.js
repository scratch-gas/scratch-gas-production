import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
    fetch('http://localhost:3003/auth/github')
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
    })
  }

  // componentDidMount() {
  //   fetch('/getAllMock')
  //   .then(resp => {
  //     console.log("res", resp.json());
  //     this.setState({
  //       repos: resp.json(),
  //     })
  //     //return resp.json();
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

  render() {
    return (
      // Since v4 BrowserRouter does the handling of history on its own
      <BrowserRouter> 
        <Switch>
          <Route exact path="/" render={ () => ( <Login login={this.login} />) } />
          <Route path="/repos" render={ () => (<SingleRepo repos={this.state.repos}/>) } />
          <Route path="/public" render={ () => (<PublicRepo />) } />
          <PrivateRoute path="/home" component={Home} isAuth={this.state.isAuth} err={this.state.err} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
