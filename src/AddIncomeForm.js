import React, { Component } from 'react';

export default class AddIncomeForm extends Component {
  handleShowIncomeForm = (e) => {
    this.props.toggleShowIncomeForm(e);
  };

  handleChange = (e) => {
    e.preventDefault();
    this.props.handleFormChange(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateIncome();
  };

  render() {
    const { income_total } = this.props;
    return (
      <div className="income-container" onSubmit={(e) => this.handleSubmit(e)}>
        <form className="add-income-form">
          <input
            className="add-income-input"
            placeholder="Add Income (Annual)"
            value={income_total}
            name="income_total"
            onChange={(e) => this.handleChange(e)}
          />

          <button className="update-income-btn">Update Income</button>
        </form>
        <button onClick={this.handleShowIncomeForm} className="cancel-btn">
          CANCEL
        </button>
      </div>
    );
  }
}
