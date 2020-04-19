import React, { Component } from 'react';
import SearchResult from './SearchResult';

import './styles/SearchResults.css';

export default class SearchResults extends Component {
  render() {
    const { searchResults, searchTerm } = this.props;
    return (
      <div className="search-results-container">
        {searchTerm ? (
          <>
            <h3>Search Results: </h3>
            <ul>
              {searchResults.map((val) => {
                return (
                  <SearchResult
                    key={val.id}
                    id={val.id}
                    expense_name={val.expense_name}
                    price={val.price}
                    category={val.category}
                    paid_to={val.paid_to}
                    expense_date={val.expense_date}
                  />
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    );
  }
}
