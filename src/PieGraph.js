import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './styles/PieGraph.css';

export default class PieGraph extends Component {
  render() {
    const { COLORS, catArr } = this.props;

    return (
      <div className="pie-graph-container">
        <ResponsiveContainer width="100%" aspect={1.5}>
          <PieChart>
            <Pie
              data={catArr}
              dataKey="price"
              nameKey="price"
              // outerRadius="100%"
              fill="blue"
              label
            >
              {catArr.map((entry, idx) => (
                <Cell fill={COLORS[idx % COLORS.length]} key={idx} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
