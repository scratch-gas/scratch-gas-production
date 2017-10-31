import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div id="login-container">
        <h1>Welcome to Login Page!</h1>
        <button onClick={this.props.login}>Login to GitHub</button>
      </div>
    );
  }
}

export default Login;