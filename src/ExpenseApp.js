import React, { Component } from 'react';

import axios from 'axios';
import jwt from 'jwt-decode';

import Expenses from './Expenses';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';

export default class ExpenseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      expenses: [],
      currentUser: '',
      expense_name: '',
      price: '',
      category: '',
      paid_to: '',
      startDate: new Date(),
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
    //Convert Date obj to unix for db
    // console.log(this.state.startDate.getTime() / 1000);
  }

  getCurrentUser = () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        const decodedToken = jwt(token);
        const decodedUser = decodedToken.username;
        const expireDate = decodedToken.exp;
        const currentTime = Date.now() / 1000;

        //If token is expired, remove token from localstorage & set
        //currentUser to ''
        if (expireDate < currentTime) {
          this.logout();
        } else {
          this.setState({
            currentUser: decodedUser,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleFormChange = (event) => {
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
        startDate: new Date(),
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

  addExpense = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'post',
        url: `http://localhost:5000/expenses`,
        data: {
          expense_name: this.state.expense_name,
          price: this.state.price,
          category: this.state.category,
          paid_to: this.state.paid_to,
          expense_date: this.state.startDate.getTime() / 1000,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      this.getExpenses();
      //Clear inputs after adding expense
      this.setState({
        expense_name: '',
        price: '',
        category: '',
        paid_to: '',
        startDate: '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Make API call to create an account
  createAccount = async () => {
    const result = await axios({
      method: 'post',
      url: `http://localhost:5000/users/signup`,
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      },
    });

    const token = result.data.token;

    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(token));

    //Get expenses/currentUser after loggin in
    this.getCurrentUser();
    this.getExpenses();

    this.setState({
      emai: '',
      username: '',
      password: '',
    });
  };

  setCalendar = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <div>
        <Navbar currentUser={this.state.currentUser} logout={this.logout} />
        {this.state.currentUser ? (
          <Expenses
            expenses={this.state.expenses}
            handleFormChange={this.handleFormChange}
            addExpense={this.addExpense}
            startDate={this.state.startDate}
            setCalendar={this.setCalendar}
          />
        ) : (
          <>
            <Login login={this.login} handleLogin={this.handleFormChange} />
            <SignUp
              handleSignup={this.handleFormChange}
              createAccount={this.createAccount}
            />
          </>
        )}
      </div>
    );
  }
}
