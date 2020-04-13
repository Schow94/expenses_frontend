import React, { Component } from 'react';

import axios from 'axios';
import jwt from 'jwt-decode';

import Expenses from './Expenses';
import Login from './Login';
import SignUp from './SignUp';

export default class ExpenseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      expenses: [],
      currentUser: '',
    };
  }

  componentDidMount() {
    console.log('Component Mounted');

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        this.getCurrentUser();
        this.getExpenses();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('Component Updated');
  }

  getCurrentUser = () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        const decodedToken = jwt(token);
        const decodedUser = decodedToken.username;
        this.setState({
          currentUser: decodedUser,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getExpenses = async () => {
    console.log('GETTING EXPENSES');
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'get',
        url: `http://localhost:5000/expenses`,
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({
        expenses: [...result.data],
      });

      console.log('expenses: ', this.state.expenses);
    } catch (e) {
      console.log(e);
    }
  };

  clearLoginForm = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  login = async () => {
    const result = await axios({
      method: 'post',
      url: `http://localhost:5000/users/login`,
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    });

    const token = result.data.token;
    localStorage.setItem('token', JSON.stringify(token));

    // Use username/password state only for handling input
    this.setState({
      username: '',
      password: '',
    });

    //Get expenses/currentUser after loggin in
    this.getCurrentUser();
    this.getExpenses();
    this.clearLoginForm();
    console.log(this.state.username, this.state.passoword);
  };

  logout = () => {
    this.setState({
      currentUser: '',
    });
    localStorage.removeItem('token');

    //Will clear the expenses since invalid credentials
    this.getExpenses();
  };

  render() {
    return (
      <div>
        <h1>Expense App</h1>
        {this.state.currentUser ? (
          <>
            <p>Currently signed in as: {this.state.currentUser}</p>
            <button onClick={this.logout}>Logout</button>
            <Expenses expenses={this.state.expenses} />
          </>
        ) : (
          <>
            <Login login={this.login} handleLogin={this.handleLoginChange} />
            <SignUp />
          </>
        )}
      </div>
    );
  }
}
