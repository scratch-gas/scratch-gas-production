import React, { Component } from 'react';

class SingleRepo extends Component {
  render() {
    let reposObj = this.props.repos;
    console.log("reso", reposObj);
    return (
      <div id="single-container">
        <h1>Welcome {'{username}'}</h1>

      </div>
    );
  }
}

export default SingleRepo;