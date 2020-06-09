import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER,
  GET_ALL_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE_NAME,
  EDIT_EXPENSE_PRICE,
  EDIT_EXPENSE_CATEGORY,
  EDIT_EXPENSE_PAIDTO,
  EDIT_EXPENSE_DATE,
  DELETE_EXPENSE,
} from './types';
import jwt from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

// AUTH ACTION CREATORS
export const login = (username, password) => async (dispatch) => {
  const res = await axios({
    method: 'POST',
    url: `${API_URL}/users/login`,
    data: {
      username: username,
      password: password,
    },
  });

  const token = res.data.token;
  localStorage.setItem('token', JSON.stringify(token));
  const decodedToken = jwt(res.data.token);
  const decodedUser = decodedToken.username;

  dispatch({ type: LOGIN, payload: decodedUser });
};

export const getCurrentUser = () => (dispatch) => {
  let currentUser;
  const token = JSON.parse(localStorage.getItem('token'));
  // Check if token is valid
  if (token) {
    const decodedToken = jwt(token);
    const decodedUser = decodedToken.username;
    const expireDate = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    //If token is expired, remove token from localstorage & set currentUser to ''
    if (expireDate < currentTime) {
      //logout here
      currentUser = '';
    } else {
      currentUser = decodedUser;
    }
  }
  console.log('current user: ', currentUser);
  dispatch({ type: GET_CURRENT_USER, payload: currentUser });
};

export const logout = (user) => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT, payload: '' });
};

//EXPENSE ACTION CREATORS
export const getAllExpenses = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  //Data from API
  const res = await axios({
    method: 'GET',
    url: `${API_URL}/expenses`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('action creator: ', res.data);
  dispatch({ type: GET_ALL_EXPENSES, payload: res.data });
};

export const addExpense = (
  expense_name,
  price,
  category,
  paid_to,
  startDate
) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'post',
    url: `${API_URL}/expenses`,
    data: {
      expense_name: expense_name,
      price: price,
      category: category,
      paid_to: paid_to,
      expense_date: startDate.getTime() / 1000,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('ADD_EXPENSE Action Creator: ', res.data);

  dispatch({ type: ADD_EXPENSE, payload: res.data });
};

export const deleteExpense = (expenseId) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'delete',
    url: `${API_URL}/expenses/${expenseId}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: DELETE_EXPENSE, payload: res.data });
};

// EDIT EXPENSE ROUTES

//EDIT - EXPENSE NAME
export const editExpenseName = (expenseId, expenseName) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'patch',
    url: `${API_URL}/expenses/${expenseId}`,
    data: {
      expense_name: expenseName,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: EDIT_EXPENSE_NAME, payload: res.data });
};

export const editExpensePrice = (expenseId, price) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'patch',
    url: `${API_URL}/expenses/${expenseId}`,
    data: {
      price: price,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: EDIT_EXPENSE_PRICE, payload: res.data });
};

export const editExpenseCategory = (expenseId, category) => async (
  dispatch
) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'patch',
    url: `${API_URL}/expenses/${expenseId}`,
    data: {
      category: category,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: EDIT_EXPENSE_CATEGORY, payload: res.data });
};

export const editExpensePaidTo = (expenseId, paid_to) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'patch',
    url: `${API_URL}/expenses/${expenseId}`,
    data: {
      paid_to: paid_to,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: EDIT_EXPENSE_PAIDTO, payload: res.data });
};

export const editExpenseDate = (expenseId, time) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await axios({
    method: 'patch',
    url: `${API_URL}/expenses/${expenseId}`,
    data: {
      expense_date: time.getTime() / 1000,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({ type: EDIT_EXPENSE_DATE, payload: res.data });
};
