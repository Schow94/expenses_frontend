import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  deleteExpense,
  editExpenseName,
  editExpensePrice,
  editExpenseCategory,
  editExpensePaidTo,
  editExpenseDate,
} from './actions';

import './styles/ExpenseRow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ExpenseRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: this.props.expense_name,
      priceInput: this.props.price,
      categoryInput: this.props.category,
      paid_toInput: this.props.paid_to,
      startDateInput: new Date(this.props.time * 1000),
    };
  }

  //Delete an expens
  handleDelete = (e, expenseId) => {
    e.preventDefault();
    this.props.deleteExpense(expenseId);
  };

  //input handle change
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  //edit name
  handleNameEdit = (e) => {
    e.preventDefault();
    this.props.editExpenseName(this.props.id, this.state.nameInput);
  };

  //edit price
  handlePriceEdit = (e) => {
    e.preventDefault();
    this.props.editExpensePrice(this.props.id, this.state.priceInput);
  };

  //Edit Category
  handleCategoryEdit = (e) => {
    e.preventDefault();
    this.props.editExpenseCategory(this.props.id, this.state.categoryInput);
  };

  handlePaidToEdit = (e) => {
    e.preventDefault();
    this.props.editExpensePaidTo(this.props.id, this.state.paid_toInput);
  };

  handleDateEdit = (date) => {
    this.props.editExpenseDate(this.props.id, date);
    this.setState({
      startDateInput: date,
    });
    console.log(this.state.startDateInput);
  };

  render() {
    const { id } = this.props;

    return (
      <tr className="expense-row">
        <td className="datepicker-input">
          <DatePicker
            selected={this.state.startDateInput}
            onChange={this.handleDateEdit}
          />
        </td>
        <td>
          <input
            className="edit-input"
            type="text"
            name="nameInput"
            placholder="Expense"
            value={this.state.nameInput}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => {
              this.handleNameEdit(e);
            }}
          />
        </td>
        <td>
          <input
            className="edit-input"
            type="text"
            placholder="price"
            name="priceInput"
            value={this.state.priceInput}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => {
              this.handlePriceEdit(e);
            }}
          />
        </td>
        <td>
          <input
            className="edit-input"
            type="text"
            placholder="category"
            name="categoryInput"
            value={this.state.categoryInput}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => {
              this.handleCategoryEdit(e);
            }}
          />
        </td>
        <td>
          <input
            className="edit-input"
            type="text"
            placholder="Paid to"
            name="paid_toInput"
            value={this.state.paid_toInput}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => {
              this.handlePaidToEdit(e);
            }}
          />
        </td>
        <td>
          <button
            onClick={(e) => this.handleDelete(e, id)}
            className="delete-expense-btn"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(null, {
  deleteExpense,
  editExpenseName,
  editExpensePrice,
  editExpenseCategory,
  editExpensePaidTo,
  editExpenseDate,
})(ExpenseRow);
