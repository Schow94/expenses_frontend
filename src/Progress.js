import React, { Component } from 'react';
import './styles/Progress.css';

export default class Progress extends Component {
  render() {
    return (
      <div className="ProgressBar">
        <div
          className="Progress"
          style={{ width: this.props.progress + '%' }}
        ></div>
      </div>
    );
  }
}
