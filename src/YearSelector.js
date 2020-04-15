import React, { Component } from 'react';
// import './styles/ItemToShowOnGraph.css';

export default class YearSelector extends Component {
  handleChange = (e) => {
    this.props.onGraphChange(e.target.value);
  };

  render() {
    const { graphSelected } = this.props;
    return (
      <div className="graph-params">
        <label htmlFor="graphParam">Year:</label>
        <select
          className="select"
          id="graphParam"
          value={graphSelected}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="ALL">ALL</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
        </select>
      </div>
    );
  }
}
