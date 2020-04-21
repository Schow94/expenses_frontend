import React, { Component } from 'react';
import './styles/SearchBar.css';

export default class SearchBar extends Component {
  handleFormChange = (e) => {
    e.preventDefault();
    this.props.handleFormChange(e);
    this.props.filterSearchData();
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { searchTerm } = this.props;
    return (
      <form className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          className="search-input"
          type="search"
          name="searchTerm"
          placeholder="Search for an expense"
          autoComplete="off"
          onChange={(e) => this.handleFormChange(e)}
          value={searchTerm}
        />
      </form>
    );
  }
}
