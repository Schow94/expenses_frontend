import React, { Component } from 'react';

export default class AddIncomeForm extends Component {
  handleShowIncomeForm = () => {
    this.props.toggleShowIncomeForm();
  };
  
  render() {
    return (
      <div className="income-container">
        <form className="add-income-form">
          <input
            className="add-income-input"
            placeholder="Add Income (Monthly)"
          ></input>
          <button className="update-income-btn">Update Income</button>
        </form>
        <button onClick={this.handleShowIncomeForm} className="cancel-btn">
          CANCEL
        </button>
      </div>
    );
  }
}
