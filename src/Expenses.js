import React, { Component } from 'react';

import Expense from './Expense';
import AddExpenseForm from './AddExpenseForm';
import Graph1 from './Graph1';

import './styles/Expenses.css';

export default class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAddExpense: false,
    };
  }

  toggleAddForm = () => {
    this.setState({
      toggleAddExpense: !this.state.toggleAddExpense,
    });
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
            Add a new expense
          </button>
          )}
        
        {/* <Graph1
          graphData={expenses}
        /> */}

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
                <Expense
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
      </div>
    );
  }
}
