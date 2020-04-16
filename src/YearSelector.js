import React, { Component } from 'react';
import './styles/YearSelector.css';
export default class YearSelector extends Component {
  handleChange = (e) => {
    // e.preventDefault();
    this.props.getYearExpenses(e.target.value);
    // console.log(e.target.value);
  };

  render() {
    const { year } = this.props;
    return (
      <div className="year-selector">
        <label htmlFor="year">Year:</label>
        <select
          className="select"
          id="year"
          value={year}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="ALL">ALL</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
        </select>
      </div>
    );
  }
}
