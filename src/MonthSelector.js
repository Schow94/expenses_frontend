import React, { Component } from 'react';
import './styles/MonthSelector.css';
export default class YearSelector extends Component {
  handleChange = (e) => {
    // e.preventDefault();
    this.props.getMonthExpenses(e.target.value);
    // console.log(e.target.value);
  };

  render() {
    const { month } = this.props;
    return (
      <div className="month-selector">
        <label htmlFor="month">Month:</label>
        <select
          className="select"
          id="month"
          value={month}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="ALL">ALL</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>
    );
  }
}
