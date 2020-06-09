import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, getCurrentUser, getAllExpenses } from './actions';

import './styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearForm = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearLoginErr();
    this.props.login(this.state.username, this.state.password).then(() => {
      // if (!this.props.loginError) {
      //   this.props.loading();
      // } else {
      //   this.props.hasLoaded();
      // }
      this.props.getCurrentUser();
      this.props.getAllExpenses();
      this.props.hasLoaded();
    });
    this.props.loading();

    // this.clearForm();
  };

  componentDidMount() {
    console.log('Login Mounted');
  }

  componentDidUpdate() {
    console.log('Login Updated');
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
            value={this.state.username}
          ></input>
          <input
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
          ></input>
          <button className="login-btn">Login</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { login, getCurrentUser, getAllExpenses })(Login);
