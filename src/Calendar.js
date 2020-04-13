import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Example extends Component {
  handleChange = (date) => {
    this.props.setCalendar(date);
  };

  render() {
    const { startDate } = this.props;
    return <DatePicker selected={startDate} onChange={this.handleChange} />;
  }
}
