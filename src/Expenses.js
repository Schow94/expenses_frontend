import React, { Component } from 'react';

import ExpenseRow from './ExpenseRow';
import AddExpenseForm from './AddExpenseForm';
import ExpenseEditInput from './ExpenseEditInput';
import Graph1 from './Graph1';

import './styles/Expenses.css';

export default class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAddExpense: false,
      toggleEditOn: false,
    };
  }

  toggleAddForm = () => {
    this.setState({
      toggleAddExpense: !this.state.toggleAddExpense,
    });
  };

  toggleEditForm = () => {
    this.setState({
      toggleEditOn: !this.state.toggleEditOn,
    });
    console.log(this.state.toggleEditOn);
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {
      expenses,
      handleFormChange,
      addExpense,
      startDate,
      setCalendar,
      expense_name,
      price,
      category,
      paid_to,
    } = this.props;

    const { toggleAddExpense } = this.state;

    //Might be easier to do this on the backend in postgres

    const totalPrice = expenses.reduce((acc, curr) => {
      return acc + Number(curr.price);
    }, 0);

    return (
      <div className="expenses-container">
        <h1 className="expenses-title">Total Expenses: ${totalPrice}</h1>
        <button className="toggle-edit-btn" onClick={this.toggleEditForm}>
          {!this.state.toggleEditOn ? `EDIT` : `Go Back`}
        </button>
        {toggleAddExpense ? (
          <>
            <button
              onClick={this.toggleAddForm}
              className="toggle-add-expense-btn toggle-on"
            >
              Go Back
            </button>

            <AddExpenseForm
              setCalendar={setCalendar}
              startDate={startDate}
              handleFormChange={handleFormChange}
              addExpense={addExpense}
              expense_name={expense_name}
              price={price}
              category={category}
              paid_to={paid_to}
              toggleAddExpense={toggleAddExpense}
              toggleAddForm={this.toggleAddForm}
            />
          </>
        ) : (
          <button
            onClick={this.toggleAddForm}
            className="toggle-add-expense-btn toggle-off"
          >
            Add Expense
          </button>
        )}

        {/* <Graph1
          graphData={expenses}
        /> */}

        <div className="edit-container">
          {!this.state.toggleEditOn ? (
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="table-header">Date</div>
                  </th>
                  <th>
                    <div className="table-header">Expense</div>
                  </th>
                  <th>
                    <div className="table-header">Price</div>
                  </th>
                  <th>
                    <div className="table-header">Category</div>
                  </th>
                  <th>
                    <div className="table-header">Paid To</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((val) => {
                  return (
                    <ExpenseRow
                      key={val.id}
                      time={val.expense_date}
                      id={val.id}
                      name={val.expense_name}
                      price={val.price}
                      category={val.category}
                      paid_to={val.paid_to}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <form className="expense-edit-form">
              <button className="save-edit-btn">Save Changes</button>
              {expenses.map((val) => {
                return (
                  <ExpenseEditInput
                    key={val.id}
                    time={val.expense_date}
                    id={val.id}
                    name={val.expense_name}
                    price={val.price}
                    category={val.category}
                    paid_to={val.paid_to}
                  />
                );
              })}
            </form>
          )}
        </div>
      </div>
    );
  }
}
