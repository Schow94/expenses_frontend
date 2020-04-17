import React, { Component } from 'react';
import './styles/Navbar.css';

export default class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  handleClick = () => {
    this.props.toggleAccountInfo();
  };

  render() {
    const { currentUser, toggleAccountInfo } = this.props;
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-title">Expens.io</li>
          {currentUser ? (
            <>
              <div className="logout-btn-container">
                <p className="current-user">
                  Currently signed in as: {currentUser}
                </p>
                <button className="logout-btn" onClick={this.handleLogout}>
                  Logout
                </button>
                <button onClick={this.handleClick} className="user-btn">
                  <i className="user-icon fa fa-user-circle"></i>
                </button>
              </div>
            </>
          ) : null}
        </ul>
      </nav>
    );
  }
}
