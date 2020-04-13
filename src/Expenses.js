import React, { Component } from 'react';
import Expense from './Expense';

import './styles/Expenses.css';

export default class Expenses extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <h1>Expenses</h1>
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
                  time={val.created_at}
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
