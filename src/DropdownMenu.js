import React, { Component } from 'react';
import './styles/DropdownMenu.css';

export default class DropdownMenu extends Component {
  handleShowIncomeForm = () => {
    this.props.toggleShowIncomeForm();
  };

  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li className="menu-list-item">Account Info</li>

          <hr></hr>

          <li onClick={this.handleShowIncomeForm} className="menu-list-item">
            Income
          </li>
          <hr></hr>

          <li className="menu-list-item">Savings</li>
          <hr></hr>

          <li className="menu-list-item">Retirement</li>
          <hr></hr>

          <li className="menu-list-item ">Debt</li>
        </ul>
      </div>
    );
  }
}
