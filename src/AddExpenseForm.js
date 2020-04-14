import React, { Component } from 'react';
import Calendar from './Calendar';

import './styles/AddExpenseForm.css';

export default class AddExpenseForm extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleFormChange(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addExpense();
  };

  render() {
    const {
      startDate,
      setCalendar,
      expense_name,
      price,
      category,
      paid_to,
    } = this.props;
    return (
      <div className="addExpense-container">
        <form className="add-expense-form" onSubmit={this.handleSubmit}>
          <div className="calendar-container">
            <Calendar startDate={startDate} setCalendar={setCalendar} />
          </div>

          <input
            className="expense_name"
            type="text"
            name="expense_name"
            value={expense_name}
            placeholder="Expense"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            className="price"
            type="text"
            name="price"
            value={price}
            placeholder="Price"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            className="category"
            type="text"
            name="category"
            value={category}
            placeholder="Category"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            className="paid_to"
            type="text"
            name="paid_to"
            value={paid_to}
            placeholder="Paid To"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <button className="add-expense-btn">Add Expense</button>
        </form>
      </div>
    );
  }
}
