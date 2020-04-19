import React, { Component } from 'react';

import './styles/SearchResult.css';

export default class SearchResult extends Component {
  render() {
    const {
      id,
      expense_name,
      price,
      category,
      paid_to,
      expense_date,
    } = this.props;

    const date = `${new Date(`${expense_date}` * 1000)}`.slice(3, 15);
    // console.log(date);

    return (
      <li id={id} className="search-result-container">
        <p className="search-column">Expense: {expense_name}</p>
        <p className="search-column">{`Price: $${price}`}</p>
        <p className="search-column">Category: {category}</p>
        <p className="search-column">Paid to: {paid_to}</p>
        <p className="search-column">Date: {date}</p>
      </li>
    );
  }
}
