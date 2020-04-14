import React, { Component } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Label,
} from 'recharts';

// import './styles/Graph1.css';

export default class Graph1 extends Component {
  render() {
    const { expenses } = this.props;


    return (
      <ResponsiveContainer className="graph-container" width="80%" height={400}>
        <LineChart
          data={expenses}
          margin={{ top: 20, right: 10, left: 20, bottom: 80 }}
        >
          <XAxis
            dataKey="created_at"
            interval={20}
            tick={{ fill: 'black', fontSize: 13 }}
            stroke="black"
          >
            <Label
              value="created_at"
              offset={1}
              position="insideBottom"
              dy={20}
              style={{ fill: 'black', fontSize: 13 }}
            />
          </XAxis>

          <YAxis
            dataKey="price"
            // domain={[0, Math.ceil(high * 1.1)]}
            tick={{ fill: 'black', fontSize: 13 }}
            stroke="black"
          >
            <Label
              value="price"
              offset={1}
              position="left"
              angle={-90}
              dx={-10}
              style={{ fill: 'black', fontSize: 13 }}
            />
          </YAxis>
          {/* <Legend /> */}
          <Tooltip />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <Line
            dot={false}
            type="monotone"
            // dataKey={graphSelected}
            stroke="black"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
