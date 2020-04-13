import React, { Component } from 'react';

import './styles/Expense.css';

export default class Expense extends Component {
  render() {
    const { time, id, name, price, category, paid_to } = this.props;
    const convertedTime = new Date(time * 1000);
    const strDate = `${convertedTime}`.slice(4, 15);
    return (
      <tr>
        <td>{strDate}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{paid_to}</td>
      </tr>
    );
  }
}
