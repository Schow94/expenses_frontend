import React, { Component } from 'react';
// import './styles/ItemToShowOnGraph.css';

export default class Selector extends Component {
  handleChange = (e) => {
    this.props.onGraphChange(e.target.value);
  };

  render() {
    const { graphSelected } = this.props;
    return (
      <div className="graph-params">
        <label htmlFor="graphParam">Graph Parameter:</label>
        <select
          className="select"
          id="graphParam"
          value={graphSelected}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="high">High</option>
          <option value="low">Low</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
          <option value="volume">Volume</option>
        </select>
      </div>
    );
  }
}
