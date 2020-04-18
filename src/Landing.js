import React, { Component } from 'react';
import './styles/Landing.css';
import piechartImage from './Expensio_Piechart.png';

export default class Landing extends Component {
  handleLoginClick = () => {
    this.props.toggleLoginForm();
  };

  handleSignupClick = () => {
    this.props.toggleSignupForm();
  };

  render() {
    return (
      <div className="landing-container">
        {/* <img className="piechart-image" src={piechartImage} alt="piechart" /> */}
        <div className="content-container">
          <h1 className="landing-title">Expens . IO</h1>
          <p className="subscript">Expenses redefined</p>
          <div className="btn-container">
            <button
              onClick={this.handleSignupClick}
              className="landing-signup-btn"
            >
              Signup
            </button>
            <button
              onClick={this.handleLoginClick}
              className="landing-login-btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
