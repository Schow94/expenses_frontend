import { SET_CALENDAR } from '../actions/types';

const initialState = { startDate: new Date() };

// Probably better to leave this in local state for the calendar component
// Time will be refreshed each time calendar component reloads/remounts
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_CALENDAR:
//       console.log('set calendar:', action.payload);
//       return { startDate: action.payload };

//     default:
//       return state;
//   }
// }
