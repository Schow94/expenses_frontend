import { LOGIN, GET_CURRENT_USER, LOGOUT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN REDUCER: ', action.payload);
      console.log('LOGIN REDUCER: ', action.payload);
      return { ...state, currentUser: action.payload };
    case GET_CURRENT_USER:
      console.log('state: ', state);
      console.log('GET_CURRENT_USER: ', action.payload);
      return { ...state, currentUser: action.payload };
    case LOGOUT:
      console.log('LOGOUT: ', action.payload);
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
