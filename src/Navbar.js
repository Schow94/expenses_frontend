import React, { Component } from 'react';
import './styles/Navbar.css';

export default class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { currentUser } = this.props;
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-title">Expens.io</li>
          {currentUser ? (
            <>
              <div className="logout-btn-container">
                <p>Currently signed in as: {currentUser}</p>
                <button className="logout-btn" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </ul>
      </nav>
    );
  }
}
