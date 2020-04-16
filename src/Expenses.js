import React, { Component } from 'react';

import ExpenseRow from './ExpenseRow';
import AddExpenseForm from './AddExpenseForm';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import Graph1 from './Graph1';

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
      expense_name,
      price,
      category,
      paid_to,
      deleteExpense,
      toggleAddExpense,
      toggleEditOn,
      toggleAddForm,
      toggleEditForm,
      editExpenseName,
      editExpensePrice,
      editExpenseCategory,
      editExpensePaidTo,
      editExpenseDate,
      year,
      getYearExpenses,
      month,
      getMonthExpenses,
      day,
      getDayExpenses,
      graphData,
    } = this.props;

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
              onClick={toggleAddForm}
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
              toggleAddForm={toggleAddForm}
            />
          </>
        ) : (
          <button
            onClick={toggleAddForm}
            className="toggle-add-expense-btn toggle-off"
          >
            Add New Expense
          </button>
        )}

        <div className="selector-container">
          <YearSelector year={year} getYearExpenses={getYearExpenses} />
          {year !== 'ALL' ? (
            <MonthSelector month={month} getMonthExpenses={getMonthExpenses} />
          ) : null}
          {year !== 'ALL' && month !== 'ALL' ? (
            <DaySelector day={day} getDayExpenses={getDayExpenses} />
          ) : null}
        </div>
        <Graph1 graphData={graphData} />

        <div className="edit-container">
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
        </div>
      </div>
    );
  }
}
