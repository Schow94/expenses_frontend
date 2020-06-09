import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addExpense } from './actions';
import Calendar from './Calendar';

import './styles/AddExpenseForm.css';

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_name: '',
      price: '',
      category: '',
      paid_to: '',
      startDate: new Date(),
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearForm = () => {
    this.setState({
      expense_name: '',
      price: '',
      category: '',
      paid_to: '',
    });
  };

  setCalendar = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { expense_name, price, category, paid_to, startDate } = this.state;

    this.props.addExpense(expense_name, price, category, paid_to, startDate);
    this.props.toggleAddForm();
    this.clearForm();
  };

  render() {
    const { expense_name, price, category, paid_to } = this.state;
    return (
      <div className="addExpense-container">
        <form className="add-expense-form" onSubmit={this.handleSubmit}>
          <div className="calendar-container">
            <Calendar
              startDate={this.state.startDate}
              setCalendar={this.setCalendar}
            />
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

const mapStateToProps = (state) => {
  return {
    startDate: state.startDate,
  };
};

export default connect(mapStateToProps, { addExpense })(AddExpenseForm);
