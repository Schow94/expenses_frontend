import React, { Component } from 'react';
import './styles/Navbar.css';

export default class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { currentUser } = this.props;
    return (
      <ul className="nav-container">
        <li className="nav-title">Expenses</li>
        {currentUser ? (
          <>
            <p>Currently signed in as: {currentUser}</p>
            <button className="logout-btn" onClick={this.handleLogout}>
              Logout
            </button>
          </>
        ) : null}
      </ul>
    );
  }
}
