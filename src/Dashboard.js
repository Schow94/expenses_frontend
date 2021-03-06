import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jwt-decode';

import { getCurrentUser, logout, getAllExpenses } from './actions';

import Expenses from './Expenses';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';
import Landing from './Landing';
import Spinner from './Spinner';
import CategoryBreakdownItem from './CategoryBreakdownItem';

import './styles/ExpenseApp.css';
import './styles/Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allExpenses: [],
      graphData: [],
      toggleAddExpense: false,
      toggleEditOn: false,
      year: 'ALL',
      month: 'ALL',
      day: 'ALL',
      showAccountInfo: false,
      showIncomeForm: false,
      showDropdownMenu: false,
      loginError: '',
      showSignupForm: false,
      showLoginForm: false,
      income_total: 0,
      searchTerm: '',
      searchResults: [],
      csvData: [],
      isLoading: false,
      showImportForm: false,
    };
  }

  componentDidMount() {
    console.log('Component Mounted');
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        this.props.getCurrentUser();
        this.props.getAllExpenses();
        this.getIncome();
        this.hasLoaded();
      } else {
        console.log('No token present');
        this.wakeupHeroku();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    console.log('Component Updated');
    // this.props.getCurrentUser();
  }

  componentWillUnmount() {}

  wakeupHeroku = async () => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}/landing`,
    });
    console.log(result);
  };

  // getCurrentUser = () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token'));
  //     if (token) {
  //       const decodedToken = jwt(token);
  //       const decodedUser = decodedToken.username;
  //       const expireDate = decodedToken.exp;
  //       const currentTime = Date.now() / 1000;

  //       //If token is expired, remove token from localstorage & set
  //       //currentUser to ''
  //       if (expireDate < currentTime) {
  //         this.logout();
  //       } else {
  //         this.setState({
  //           currentUser: decodedUser,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // getAllExpenses = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token'));

  //     //Data from API
  //     const result = await axios({
  //       method: 'get',
  //       url: `${API_URL}/expenses`,
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     // Save prices for graphs
  //     const prices = result.data.map((val) => {
  //       const obj = {};
  //       const date = new Date(val.expense_date * 1000);

  //       obj['price'] = Number(val.price);
  //       obj['date'] = `${date}`.slice(0, 15);
  //       return obj;
  //     });

  //     //Format data to be saved to CSV
  //     const csvData = result.data.map((val) => {
  //       let obj = {};
  //       let dateObj = new Date(val.expense_date * 1000);
  //       let year = dateObj.getFullYear().toString();
  //       let month = (dateObj.getMonth() + 1).toString();
  //       let day = dateObj.getDate().toString();

  //       obj['expense_name'] = val.expense_name;
  //       obj['price'] = val.price;
  //       obj['category'] = val.category;
  //       obj['paid_to'] = val.paid_to;
  //       obj['expense_date'] = `${month}-${day}-${year}`;

  //       return obj;
  //     });

  //     this.setState(
  //       {
  //         csvData: csvData,
  //         graphData: [...prices],
  //         expenses: [...result.data],
  //         allExpenses: [...result.data],
  //         startDate: new Date(),
  //       },
  //       this.hasLoaded()
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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

  // login = async () => {
  //   console.log('logggin in');
  //   try {
  //     const result = await axios({
  //       method: 'post',
  //       url: `${API_URL}/users/login`,
  //       data: {
  //         username: this.state.username,
  //         password: this.state.password,
  //       },
  //     });

  //     const token = result.data.token;
  //     localStorage.setItem('token', JSON.stringify(token));

  //     //Get expenses/currentUser after loggin in
  //     this.getCurrentUser();
  //     this.getAllExpenses();
  //     this.getIncome();
  //     // this.clearLoginForm();

  //     const loginErr = result['data']['message'];
  //     if (loginErr) {
  //       console.log('Theres a login err');
  //       this.setState({
  //         loginError: loginErr,
  //         // username: '',
  //         // password: '',
  //       });
  //     } else {
  //       // Use username/password state only for handling input
  //       console.log('There are no login errors');
  //       this.setState({
  //         loginError: '',
  //         username: '',
  //         password: '',
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // logout = () => {
  //   this.setState({
  //     // currentUser: '',
  //     toggleAddExpense: false,
  //   });
  //   localStorage.removeItem('token');

  //   //Will clear the expenses since invalid credentials
  //   // this.getAllExpenses();
  // };

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
    this.props.getCurrentUser();
    // this.getAllExpenses();

    this.setState({
      emai: '',
      username: '',
      password: '',
    });
  };

  //Move logic to state
  formatGraphData = () => {
    const data = this.state.expenses.map((val) => {
      return val;
    });

    this.setState({
      graphData: '',
    });
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

  toggleDropdownMenu = () => {
    this.setState({
      showDropdownMenu: !this.state.showDropdownMenu,
    });
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
      showDropdownMenu: false,
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

  updateIncome = async (income) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log(typeof income);
      const result = await axios({
        method: 'post',
        url: `${API_URL}/users/income`,
        data: {
          income_total: Number(this.state.income_total),
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(income);

      this.setState({
        showIncomeForm: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getIncome = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const result = await axios({
        method: 'get',
        url: `${API_URL}/users/income`,
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({
        income_total: result.data.income_total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  filterSearchData = () => {
    let filteredData = this.state.allExpenses.filter((expense) => {
      let nameResult =
        expense.expense_name
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1;

      let categoryResult =
        expense.category
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1;

      let paidToResult =
        expense.paid_to
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1;

      return nameResult || categoryResult || paidToResult;
    });

    //Want to sort by date which is in unix time
    // let sorted = filteredData.sort();

    this.setState({
      searchResults: [...filteredData],
    });

    // console.log('filteredData: ', filteredData);
    //Search through allExpenses arr and update searchResults arr
  };

  loading = () => {
    this.setState({
      isLoading: true,
    });
  };

  hasLoaded = () => {
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 500);
  };

  clearLoginErr = () => {
    this.setState({
      loginError: '',
    });
  };

  toggleShowImportForm = () => {
    this.setState(
      {
        showImportForm: !this.state.showImportForm,
      },
      () => {
        console.log(this.state.showImportForm);
      }
    );
  };

  render() {
    const { expenses, income_total, month } = this.state;

    const totalPrice = expenses
      .reduce((acc, curr) => {
        return acc + Number(curr.price);
      }, 0)
      .toFixed(2);

    const categoryObj = {};

    const createCatBreak = () => {
      for (let i = 0; i < expenses.length; i++) {
        if (categoryObj[expenses[i]['category']]) {
          categoryObj[expenses[i]['category']] += Number(expenses[i]['price']);
        } else {
          categoryObj[expenses[i]['category']] = Number(expenses[i]['price']);
        }
      }
    };

    createCatBreak();

    const catNames = Object.keys(categoryObj);
    const catPrices = Object.values(categoryObj);

    const catArr = catNames.map((val, idx) => {
      let obj = {};
      obj['expense'] = catNames[idx];
      obj['price'] = catPrices[idx];

      return obj;
    });

    const income_taxed = income_total * 0.7;
    const month_income_taxed = income_taxed / 12;

    const amount_left_month = month_income_taxed - totalPrice;

    const COLORS = [
      '#f714ce',
      '#f71942',
      'grey',
      '#10e348',
      'teal',
      'blue',
      'brown',
      '#14bef7',
      'orange',
      'purple',
      'black',
      '#19f78c',
      'pink',
      '#bab400',
      '#d705f7',
      '#f76205',
      '#05f7cf',
      '#0576f7',
    ];

    // console.log(catArr);

    //Headers of CSV
    const headers = [
      { label: 'Expense', key: 'expense_name' },
      { label: 'Price', key: 'price' },
      { label: 'Category', key: 'category' },
      { label: 'Paid To', key: 'paid_to' },
      { label: 'Date', key: 'expense_date' },
    ];

    return (
      <>
        <Navbar
          currentUser={this.props.auth.currentUser}
          logout={this.props.logout}
          toggleDropdownMenu={this.toggleDropdownMenu}
        />

        {this.state.isLoading ? (
          <Spinner />
        ) : this.props.auth.currentUser ? (
          //   <Expenses
          //     // contentCached={contentCached}
          //     // updateAvailable={updateAvailable}
          //     expenses={this.state.expenses}
          //     allExpenses={this.state.allExpenses}
          //     handleFormChange={this.handleFormChange}
          //     expense_name={this.state.expense_name}
          //     price={this.state.price}
          //     category={this.state.category}
          //     paid_to={this.state.paid_to}
          //     deleteExpense={this.deleteExpense}
          //     toggleAddForm={this.toggleAddForm}
          //     toggleEditForm={this.toggleEditForm}
          //     toggleAddExpense={this.state.toggleAddExpense}
          //     toggleEditOn={this.state.toggleEditOn}
          //     editExpenseName={this.editExpenseName}
          //     editExpensePrice={this.editExpensePrice}
          //     editExpenseCategory={this.editExpenseCategory}
          //     editExpensePaidTo={this.editExpensePaidTo}
          //     editExpenseDate={this.editExpenseDate}
          //     year={this.state.year}
          //     getYearExpenses={this.getYearExpenses}
          //     month={this.state.month}
          //     getMonthExpenses={this.getMonthExpenses}
          //     day={this.state.day}
          //     getDayExpenses={this.getDayExpenses}
          //     graphData={this.state.graphData}
          //     showAccountInfo={this.state.showAccountInfo}
          //     showIncomeForm={this.state.showIncomeForm}
          //     toggleShowIncomeForm={this.toggleShowIncomeForm}
          //     showDropdownMenu={this.state.showDropdownMenu}
          //     toggleDropdownMenu={this.toggleDropdownMenu}
          //     income_total={this.state.income_total}
          //     updateIncome={this.updateIncome}
          //     searchTerm={this.state.searchTerm}
          //     filterSearchData={this.filterSearchData}
          //     searchResults={this.state.searchResults}
          //     currentUser={this.state.currentUser}
          //     csvData={this.state.csvData}
          //     getAllExpenses={this.getAllExpenses}
          //     toggleShowImportForm={this.toggleShowImportForm}
          //     showImportForm={this.state.showImportForm}
          //   />
          <div className="dash-container">
            <div className="left-column">
              {catNames.map((x, idx) => {
                return (
                  <CategoryBreakdownItem
                    catPrices={catPrices}
                    COLORS={COLORS}
                    idx={idx}
                    key={idx}
                    totalPrice={totalPrice}
                    name={x}
                    month_income_taxed={month_income_taxed}
                    month={month}
                  />
                );
              })}
            </div>
            <div className="middle-column">
              <div className="middle-top">Top</div>
              <div className="middle-bottom">Bottom</div>
            </div>
            <div className="right-column">Right</div>
          </div>
        ) : (
          <>
            {this.state.showLoginForm ? (
              <Login
                loginError={this.state.loginError}
                clearLoginErr={this.clearLoginErr}
                // login={this.login}
                handleLogin={this.handleFormChange}
                loading={this.loading}
                clearLoginForm={this.clearLoginForm}
                // username={this.state.username}
                // password={this.state.password}
              />
            ) : this.state.showSignupForm ? (
              <SignUp
                handleSignup={this.handleFormChange}
                createAccount={this.createAccount}
                loading={this.loading}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    expenses: state.expenses,
  };
};

export default connect(mapStateToProps, {
  getCurrentUser,
  logout,
  getAllExpenses,
})(Dashboard);
