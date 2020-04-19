import React, { Component } from 'react';
import './styles/CategoryBreakdownItem.css';

export default class CategoryBreakdownItem extends Component {
  render() {
    const {
      COLORS,
      idx,
      catPrices,
      totalPrice,
      name,
      month_income_taxed,
      month,
    } = this.props;

    const percentOfIncome = (catPrices[idx] / month_income_taxed) * 100;

    return (
      // Need to fix to show monthly only if month has been selected
      <li
        className="category-list-item"
        style={{
          color: COLORS[idx],
        }}
        key={idx}
      >{`${name}: $${catPrices[idx].toFixed(2)} (${percentOfIncome.toFixed(
        2
      )}%)`}</li>
    );
  }
}
