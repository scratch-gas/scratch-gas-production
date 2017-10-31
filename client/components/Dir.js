import React, { Component } from 'react';
import File from './File.js';

class Dir extends Component {
  render() {
    return (
      <div className="Dir">
        This is the Dir Component
        <File />
      </div>
    );
  }
}

export default Dir;