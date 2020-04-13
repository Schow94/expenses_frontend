import React, { Component } from 'react';
import Calendar from './Calendar';

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
    const { startDate, setCalendar } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button>Add Expense</button>
          <Calendar startDate={startDate} setCalendar={setCalendar} />

          <input
            type="text"
            name="expense_name"
            value={this.props.expense_name}
            placeholder="Expense"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            type="text"
            name="price"
            value={this.props.price}
            placeholder="Price"
            autoComplete="off"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            type="text"
            name="category"
            value={this.props.category}
            placeholder="Category"
            onChange={(e) => this.handleChange(e)}
          ></input>
          <input
            type="text"
            name="paid_to"
            value={this.props.paid_to}
            placeholder="Paid To"
            onChange={(e) => this.handleChange(e)}
          ></input>
        </form>
      </div>
    );
  }
}
