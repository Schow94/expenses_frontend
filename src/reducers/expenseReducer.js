import {
  GET_ALL_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE_NAME,
  EDIT_EXPENSE_PRICE,
  EDIT_EXPENSE_CATEGORY,
  EDIT_EXPENSE_PAIDTO,
  EDIT_EXPENSE_DATE,
  DELETE_EXPENSE,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EXPENSES:
      //   console.log('GET_ALL_EXPENSES Reducer: ', action.payload);
      return [...action.payload];

    case ADD_EXPENSE:
      return [...state, action.payload];

    case EDIT_EXPENSE_NAME:
      //   console.log('EDIT EXPENSE NAME REDUCER: ', action.payload);
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.expense_name = action.payload.expense_name;
        }
        return expense;
      });

    case EDIT_EXPENSE_PRICE:
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.price = action.payload.price;
        }
        return expense;
      });

    case EDIT_EXPENSE_CATEGORY:
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.category = action.payload.category;
        }
        return expense;
      });

    case EDIT_EXPENSE_PAIDTO:
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.paid_to = action.payload.paid_to;
        }
        return expense;
      });

    case EDIT_EXPENSE_DATE:
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.expense_date = action.payload.expense_date;
        }
        return expense;
      });

    case DELETE_EXPENSE:
      let newState = state.filter((x) => x.id !== action.payload.id);
      console.log('DELETE REDUCER: ', action.payload);
      return newState;

    default:
      return state;
  }
}
