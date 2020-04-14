import React, { Component } from 'react';
import Calendar from './Calendar';
import './styles/ExpenseRow.css';
import './styles/ExpenseEditInput.css';

export default class ExpenseEditInput extends Component {
  render() {
    const {
      time,
      id,
      name,
      price,
      category,
      paid_to,
      toggleEditOn,
    } = this.props;
    const convertedTime = new Date(time * 1000);
    const strDate = `${convertedTime}`.slice(4, 15);

    return (
      <div className="edit-input-row">
        <input
          className="edit-input"
          type="text"
          placholder="date"
          value={time}
        />
        <input
          className="edit-input"
          type="text"
          placholder="name"
          value={name}
        />
        <input
          className="edit-input"
          type="text"
          placholder="price"
          value={price}
        />
        <input
          className="edit-input"
          type="text"
          placholder="category"
          value={category}
        />
        <input
          className="edit-input"
          type="text"
          placholder="paid_to"
          value={paid_to}
        />
        <button className="delete-expense-btn">Delete</button>
      </div>
    );
  }
}
