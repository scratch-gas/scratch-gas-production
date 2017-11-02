import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login.js';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.login = this.login.bind(this);
  }


  login() {
    axios.get('http://localhost:3000/auth/github', {
      method: 'GET',
    })
      .then((resp) => {
        // axios.get('http://localhost:3000/auth/github/callback', {
        //     method: 'GET',
        //   }).then(res => {
        //       console.log('second call from callback',res.data)
        //   })
       console.log(resp)
       console.log('hi')
        
      }).catch(err => console.log('THIS DA ERROR', err));
  }

  render() {
    return (
          <Login login={this.login} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
