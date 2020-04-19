import React, { Component } from 'react';

import AddExpenseForm from './AddExpenseForm';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import Graph1 from './Graph1';
import DropdownMenu from './DropdownMenu';
import AddIncomeForm from './AddIncomeForm';
import CategoryBreakdownItem from './CategoryBreakdownItem';
import PieGraph from './PieGraph';
import Table from './Table';

import { ResponsiveContainer } from 'recharts';

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
      toggleAddForm,
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
      showAccountInfo,
      showIncomeForm,
      toggleShowIncomeForm,
      toggleDropdownMenu,
      showDropdownMenu,
      income_total,
      updateIncome,
    } = this.props;

    //Move this logic to ExpenseApp.js state
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

    const income_taxed = income_total * 0.7;
    const month_income_taxed = income_taxed / 12;

    const amount_left_month = month_income_taxed - totalPrice;

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
        {showIncomeForm ? (
          <AddIncomeForm
            toggleShowIncomeForm={toggleShowIncomeForm}
            handleFormChange={handleFormChange}
            income_total={income_total}
            updateIncome={updateIncome}
          />
        ) : null}

        <p className="expenses-title">Total Expenses: ${totalPrice}</p>
        {year !== 'ALL' ? (
          <>
            <p className="income">{`Income in ${year}: $${income_total}`}</p>
            <p className="income">{`Income (After Taxes): $${income_taxed}`}</p>
          </>
        ) : null}

        {month !== 'ALL' ? (
          <>
            <p className="income">
              {`Income in ${month}-${year} (After taxes): $${month_income_taxed}`}
            </p>
            <p>{`Expenses in ${month}-${year}: $${totalPrice}`}</p>
            <p>{`Amount left to spend this month: $${amount_left_month}`}</p>
          </>
        ) : null}

        {showDropdownMenu ? (
          <DropdownMenu toggleShowIncomeForm={toggleShowIncomeForm} />
        ) : null}

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
          <ul className="category-breakdown">
            {catNames.map((x, idx) => {
              return (
                <CategoryBreakdownItem
                  catPrices={catPrices}
                  COLORS={COLORS}
                  idx={idx}
                  key={idx}
                  totalPrice={totalPrice}
                  name={x}
                  month_income_taxed={month_income_taxed}
                  month={month}
                />
              );
            })}
          </ul>

          {/* Move pie chart to its own component */}
          <PieGraph COLORS={COLORS} catArr={catArr} />
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
            <Table
              expenses={expenses}
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
          </div>
        </div>
      </div>
    );
  }
}
