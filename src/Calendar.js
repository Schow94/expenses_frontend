import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setCalendar } from './actions';

import './styles/Calendar.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends Component {
  handleChange = (date) => {
    this.props.setCalendar(date);
  };

  render() {
    const { startDate } = this.props;
    console.log('startDate from Redux: ', startDate);

    return <DatePicker selected={startDate} onChange={this.handleChange} />;
  }
}

export default Calendar;
