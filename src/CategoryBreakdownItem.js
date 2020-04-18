import React, { Component } from 'react';
import './styles/CategoryBreakdownItem.css';

export default class CategoryBreakdownItem extends Component {
  render() {
    const { COLORS, idx, catPrices, totalPrice, name } = this.props;
    return (
      <li
        className="category-list-item"
        style={{
          color: COLORS[idx],
        }}
        key={idx}
      >{`${name}: $${catPrices[idx].toFixed(2)} (${(
        (catPrices[idx] / totalPrice) *
        100
      ).toFixed(2)}%)`}</li>
    );
  }
}
