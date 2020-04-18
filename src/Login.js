import React, { Component } from 'react';
import './styles/Login.css';

export default class Login extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleLogin(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login();
  };

  render() {
    const { loginError } = this.props;
    return (
      <div className="login-container">
        <h3 className="login-title">Login</h3>
        {loginError ? (
          <div className="login-error-container">
            <h3 className="login-error-text">{loginError}</h3>
          </div>
        ) : null}

        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            type="text"
            placeholder="Username"
            name="username"
            value={this.props.username}
          ></input>
          <input
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            type="text"
            placeholder="Password"
            name="password"
            value={this.props.password}
          ></input>
          <button className="login-btn">Login</button>
        </form>
      </div>
    );
  }
}
