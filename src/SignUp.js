import React, { Component } from 'react';

import './styles/SignUp.css';

export default class SignUp extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleSignup(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAccount();
  };

  render() {
    return (
      <div className="signup-container">
        <h3>Sign Up</h3>
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter an email"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            name="email"
            value={this.props.email}
          ></input>
          <input
            type="text"
            placeholder="Choose a username"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            name="username"
            value={this.props.username}
          ></input>
          <input
            type="text"
            placeholder="Choose a password"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            name="password"
            value={this.props.password}
          ></input>
          <button className="signup-btn">Submit</button>
        </form>
      </div>
    );
  }
}
