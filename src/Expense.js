import React, { Component } from 'react';

import './styles/Expense.css';

export default class Expense extends Component {
  render() {
    const { time, id, name, price, category, paid_to } = this.props;
    return (
      <tr>
        <td>{time.slice(0, 10)}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{paid_to}</td>
      </tr>
    );
  }
}
