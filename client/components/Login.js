import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div id="login-container">
        <h1>Welcome to Login Page!</h1>
        <a href="/auth/github">Login to GitHub</a>
      </div>
    );
  }
}

export default Login;