import React, { Component } from 'react';
import Expense from './Expense';
import AddExpenseForm from './AddExpenseForm';

import './styles/Expenses.css';

export default class Expenses extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {
      expenses,
      handleFormChange,
      addExpense,
      startDate,
      setCalendar,
    } = this.props;

    return (
      <div className="expenses-container">
        <h1 className="expenses-title">Total Expenses</h1>
        <AddExpenseForm
          setCalendar={setCalendar}
          startDate={startDate}
          handleFormChange={handleFormChange}
          addExpense={addExpense}
        />
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
