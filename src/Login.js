import React, { Component } from 'react';
import './styles/Login.css';

export default class Login extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleLogin(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearLoginErr();
    this.props.login().then(() => {
      if (!this.props.loginError) {
        this.props.loading();
      }
    });

    this.props.clearLoginForm();
  };

  componentDidMount() {
    console.log('Login Mounted');
  }

  componentDidUpdate() {
    console.log('Login Updated');
    console.log(this.props);
  }

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
            type="password"
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
