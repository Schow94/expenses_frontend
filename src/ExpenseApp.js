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
      startDate: new Date(),
      expense_name: '',
      price: '',
      category: '',
      paid_to: '',
      graphData: [],
      toggleAddExpense: false,
      toggleEditOn: false,
      year: 2020,
      month: 'April',
      day: 15,
    };
  }

  componentDidMount() {
    console.log('Component Mounted');
    console.log(this.state.expenses);

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

    console.log(
      this.state.startDate,
      this.state.expense_name,
      this.state.price,
      this.state.category,
      this.state.paid_to
    );
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
      toggleAddExpense: false,
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

      console.log(this.state.startDate);

      this.getExpenses();

      //Clear inputs after adding expense
      this.setState({
        toggleAddExpense: false,
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
    console.log(this.state.startDate);
  };

  formatGraphData = () => {
    const data = this.state.expenses.map((val) => {
      return val;
    });

    console.log(data);

    this.setState({
      graphData: '',
    });
  };

  deleteExpense = async (expenseId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'delete',
        url: `http://localhost:5000/expenses/${expenseId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(expenseId);

      this.getExpenses();
    } catch (e) {
      console.log(e);
    }
  };

  toggleAddForm = () => {
    this.setState({
      toggleAddExpense: !this.state.toggleAddExpense,
    });
  };

  toggleEditForm = () => {
    this.setState({
      toggleEditOn: !this.state.toggleEditOn,
    });
  };

  //EDIT EXPENSE NAME
  editExpenseName = async (expenseId, expenseName) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'patch',
        url: `http://localhost:5000/expenses/${expenseId}`,
        data: {
          expense_name: expenseName,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(expenseId, expenseName);

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  editExpensePrice = async (expenseId, price) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'patch',
        url: `http://localhost:5000/expenses/${expenseId}`,
        data: {
          price: price,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(expenseId, price);

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  editExpenseCategory = async (expenseId, category) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'patch',
        url: `http://localhost:5000/expenses/${expenseId}`,
        data: {
          category: category,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(expenseId, category);

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  editExpensePaidTo = async (expenseId, paid_to) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'patch',
        url: `http://localhost:5000/expenses/${expenseId}`,
        data: {
          paid_to: paid_to,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(expenseId, paid_to);

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  //This code is not executing
  editExpenseDate = async (expenseId, time) => {
    //Time is correct up here
    console.log(expenseId, time);
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      //Something is getting blocked here
      const result = await axios({
        method: 'patch',
        url: `http://localhost:5000/expenses/${expenseId}`,
        data: {
          expense_date: time.getTime() / 1000,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(time);

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <Navbar currentUser={this.state.currentUser} logout={this.logout} />
        {this.state.currentUser ? (
          <Expenses
            expenses={this.state.expenses}
            handleFormChange={this.handleFormChange}
            addExpense={this.addExpense}
            startDate={this.state.startDate}
            setCalendar={this.setCalendar}
            expense_name={this.state.expense_name}
            price={this.state.price}
            category={this.state.category}
            paid_to={this.state.paid_to}
            deleteExpense={this.deleteExpense}
            toggleAddForm={this.toggleAddForm}
            toggleEditForm={this.toggleEditForm}
            toggleAddExpense={this.state.toggleAddExpense}
            toggleEditOn={this.state.toggleEditOn}
            editExpenseName={this.editExpenseName}
            editExpensePrice={this.editExpensePrice}
            editExpenseCategory={this.editExpenseCategory}
            editExpensePaidTo={this.editExpensePaidTo}
            editExpenseDate={this.editExpenseDate}
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
      </>
    );
  }
}
