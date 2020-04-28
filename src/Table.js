import React, { Component } from 'react';

import ExpenseRow from './ExpenseRow';
import './styles/Table.css';

export default class Table extends Component {
  render() {
    const {
      expenses,
      startDate,
      setCalendar,
      deleteExpense,
      handleFormChange,
      editExpenseName,
      editExpensePrice,
      editExpenseCategory,
      editExpensePaidTo,
      editExpenseDate,
    } = this.props;
    return (
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
                expense_name={val.expense_name}
                price={val.price}
                category={val.category}
                paid_to={val.paid_to}
                startDate={startDate}
                setCalendar={setCalendar}
                deleteExpense={deleteExpense}
                handleFormChange={handleFormChange}
                editExpenseName={editExpenseName}
                editExpensePrice={editExpensePrice}
                editExpenseCategory={editExpenseCategory}
                editExpensePaidTo={editExpensePaidTo}
                editExpenseDate={editExpenseDate}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}
