import React, { Component } from 'react';

import axios from 'axios';
import jwt from 'jwt-decode';

import Expenses from './Expenses';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';
import Landing from './Landing';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      year: 'ALL',
      month: 'ALL',
      day: 'ALL',
      graphData: [],
      showAccountInfo: false,
      showIncomeForm: false,
      loginError: '',
      showSignupForm: false,
      showLoginForm: false,
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
  }

  componentWillUnmount() {}

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
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'get',
        url: `${API_URL}/expenses`,
        headers: { Authorization: `Bearer ${token}` },
      });

      const prices = result.data.map((val) => {
        const obj = {};
        const date = new Date(val.expense_date * 1000);

        obj['price'] = Number(val.price);
        obj['date'] = `${date}`.slice(0, 15);
        return obj;
      });

      this.setState({
        graphData: [...prices],
        expenses: [...result.data],
        startDate: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Get all expenses for a particular year
  getYearExpenses = async (year) => {
    // console.log('GETTING YEARLY EXPENSES for:', year);
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (year === 'ALL') {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          year: year,
          expenses: [...result.data],
          startDate: new Date(),
        });
      } else {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses/${year}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          year: year,
          expenses: [...result.data],
          startDate: new Date(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMonthExpenses = async (month) => {
    // console.log('GETTING YEARLY EXPENSES for:', month);
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (month === 'ALL') {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses/${this.state.year}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          month: month,
          expenses: [...result.data],
          startDate: new Date(),
        });
      } else {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses/${this.state.year}/${month}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          month: month,
          expenses: [...result.data],
          startDate: new Date(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getDayExpenses = async (day) => {
    // console.log('GETTING daily EXPENSES for:', day);
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (day === 'ALL') {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses/${this.state.year}/${this.state.month}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          day: day,
          expenses: [...result.data],
          startDate: new Date(),
        });

        // console.log(result);
      } else {
        const result = await axios({
          method: 'get',
          url: `${API_URL}/expenses/${this.state.year}/${this.state.month}/${day}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const prices = result.data.map((val) => {
          const obj = {};
          const date = new Date(val.expense_date * 1000);

          obj['price'] = Number(val.price);
          obj['date'] = `${date}`.slice(0, 15);
          return obj;
        });

        this.setState({
          graphData: [...prices],
          day: day,
          expenses: [...result.data],
          startDate: new Date(),
        });
      }
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
    console.log('logggin in');
    try {
      const result = await axios({
        method: 'post',
        url: `${API_URL}/users/login`,
        data: {
          username: this.state.username,
          password: this.state.password,
        },
      });

      const token = result.data.token;
      localStorage.setItem('token', JSON.stringify(token));

      //Get expenses/currentUser after loggin in
      this.getCurrentUser();
      this.getExpenses();
      this.clearLoginForm();

      const loginErr = result['data']['message'];
      if (loginErr) {
        this.setState({
          loginError: loginErr,
          username: '',
          password: '',
        });
      } else {
        // Use username/password state only for handling input
        this.setState({
          loginError: '',
          username: '',
          password: '',
        });
      }
    } catch (e) {
      console.log(e);
    }
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
        url: `${API_URL}/expenses`,
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
      url: `${API_URL}/users/signup`,
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

  formatGraphData = () => {
    const data = this.state.expenses.map((val) => {
      return val;
    });

    this.setState({
      graphData: '',
    });
  };

  deleteExpense = async (expenseId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'delete',
        url: `${API_URL}/expenses/${expenseId}`,
        headers: { Authorization: `Bearer ${token}` },
      });

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
        url: `${API_URL}/expenses/${expenseId}`,
        data: {
          expense_name: expenseName,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

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
        url: `${API_URL}/expenses/${expenseId}`,
        data: {
          price: price,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

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
        url: `${API_URL}/expenses/${expenseId}`,
        data: {
          category: category,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

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
        url: `${API_URL}/expenses/${expenseId}`,
        data: {
          paid_to: paid_to,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  //This code is not executing
  editExpenseDate = async (expenseId, time) => {
    //Time is correct up here
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      //Something is getting blocked here
      const result = await axios({
        method: 'patch',
        url: `${API_URL}/expenses/${expenseId}`,
        data: {
          expense_date: time.getTime() / 1000,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      this.getExpenses();

      //Clear inputs after adding expense
    } catch (e) {
      console.log(e);
    }
  };

  toggleAccountInfo = () => {
    this.setState({
      showAccountInfo: !this.state.showAccountInfo,
    });
    console.log(this.state.showAccountInfo);
  };

  toggleShowIncomeForm = () => {
    this.setState({
      showIncomeForm: !this.state.showIncomeForm,
    });
  };

  toggleSignupForm = () => {
    this.setState({
      showSignupForm: !this.state.showSignupForm,
    });
  };

  toggleLoginForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm,
    });
  };

  render() {
    return (
      <>
        <Navbar
          currentUser={this.state.currentUser}
          logout={this.logout}
          toggleAccountInfo={this.toggleAccountInfo}
        />
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
            year={this.state.year}
            getYearExpenses={this.getYearExpenses}
            month={this.state.month}
            getMonthExpenses={this.getMonthExpenses}
            day={this.state.day}
            getDayExpenses={this.getDayExpenses}
            graphData={this.state.graphData}
            showAccountInfo={this.state.showAccountInfo}
            showIncomeForm={this.state.showIncomeForm}
            toggleShowIncomeForm={this.toggleShowIncomeForm}
          />
        ) : (
          <>
            {this.state.showLoginForm ? (
              <Login
                loginError={this.state.loginError}
                login={this.login}
                handleLogin={this.handleFormChange}
              />
            ) : this.state.showSignupForm ? (
              <SignUp
                handleSignup={this.handleFormChange}
                createAccount={this.createAccount}
              />
            ) : (
              <Landing
                toggleLoginForm={this.toggleLoginForm}
                toggleSignupForm={this.toggleSignupForm}
              />
            )}
          </>
        )}
      </>
    );
  }
}
