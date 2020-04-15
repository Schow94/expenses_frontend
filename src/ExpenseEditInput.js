import React, { Component } from 'react';
import Calendar from './Calendar';
// import './styles/ExpenseRow.css';
import './styles/ExpenseEditInput.css';

export default class ExpenseEditInput extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.handleFormChange(e);
  };

  handleClick = (e, expenseId) => {
    e.preventDefault();
    this.props.deleteExpense(expenseId);
  };

  render() {
    const {
      time,
      id,
      expense_name,
      price,
      category,
      paid_to,
      startDate,
      setCalendar,
    } = this.props;
    const convertedTime = new Date(time * 1000);
    const strDate = `${convertedTime}`.slice(4, 15);

    return (
      <div className="edit-input-row">
        <div className="calendar-container">
          <Calendar startDate={startDate} setCalendar={setCalendar} />
        </div>
        <input
          className="edit-input"
          type="text"
          name="expense_name"
          placholder="Expense"
          value={expense_name}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          className="edit-input"
          type="text"
          placholder="price"
          name="price"
          value={price}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          className="edit-input"
          type="text"
          placholder="category"
          name="category"
          value={category}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          className="edit-input"
          type="text"
          placholder="paid_to"
          name="paid_to"
          value={paid_to}
          onChange={(e) => this.handleChange(e)}
        />
        <button
          onClick={(e) => this.handleClick(e, id)}
          className="delete-expense-btn"
        >
          Delete
        </button>
      </div>
    );
  }
}
