import React, { Component } from 'react';

import ExpenseRow from './ExpenseRow';
import AddExpenseForm from './AddExpenseForm';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import Graph1 from './Graph1';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

    //Move this logic to main ExpenseApp.js & save to state
    const totalPrice = expenses
      .reduce((acc, curr) => {
        return acc + Number(curr.price);
      }, 0)
      .toFixed(2);

    const categoryObj = {};

    const createCatBreak = () => {
      for (let i = 0; i < expenses.length; i++) {
        if (categoryObj[expenses[i]['category']]) {
          categoryObj[expenses[i]['category']] += Number(expenses[i]['price']);
        } else {
          categoryObj[expenses[i]['category']] = Number(expenses[i]['price']);
        }
      }
    };

    createCatBreak();

    const catNames = Object.keys(categoryObj);
    const catPrices = Object.values(categoryObj);

    const catArr = catNames.map((val, idx) => {
      let obj = {};
      obj['expense'] = catNames[idx];
      obj['price'] = catPrices[idx];

      return obj;
    });

    const COLORS = [
      '#f714ce',
      '#f71942',
      'grey',
      '#10e348',
      'teal',
      'blue',
      'brown',
      '#14bef7',
      'orange',
      'purple',
      'black',
      '#19f78c',
      'pink',
    ];

    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({
    //   cx,
    //   cy,
    //   midAngle,
    //   innerRadius,
    //   outerRadius,
    //   percent,
    //   index,
    // }) => {
    //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //   return (
    //     <text
    //       x={x}
    //       y={y}
    //       fill="white"
    //       textAnchor="middle"
    //       dominantBaseline="central"
    //     >
    //       {`${(percent * 100).toFixed(0)}%`}
    //     </text>
    //   );
    // };

    // console.log(catArr);

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

        <div className="analytics-container">
          <ul>
            {catNames.map((x, idx) => {
              return (
                <li
                  style={{
                    color: COLORS[idx],
                    fontSize: '20px',
                    margin: '1em',
                  }}
                  key={idx}
                >{`${x}: $${catPrices[idx].toFixed(2)} (${(
                  (catPrices[idx] / totalPrice) *
                  100
                ).toFixed(2)}%)`}</li>
              );
            })}
          </ul>

          {/* Move pie chart to its own component */}
          <div className="pie-graph-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={catArr}
                  dataKey="price"
                  nameKey="price"
                  // outerRadius={100}
                  fill="blue"
                  label
                >
                  {catArr.map((entry, idx) => (
                    <Cell fill={COLORS[idx % COLORS.length]} key={idx} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="selector-container">
          <YearSelector year={year} getYearExpenses={getYearExpenses} />
          {year !== 'ALL' ? (
            <MonthSelector month={month} getMonthExpenses={getMonthExpenses} />
          ) : null}
          {year !== 'ALL' && month !== 'ALL' ? (
            <DaySelector day={day} getDayExpenses={getDayExpenses} />
          ) : null}
        </div>

        <div className="graph-table-container">
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={300}>
              <Graph1 graphData={graphData} />
            </ResponsiveContainer>
          </div>
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
      </div>
    );
  }
}
