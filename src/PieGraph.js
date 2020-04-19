import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './styles/PieGraph.css';

export default class PieGraph extends Component {
  render() {
    const { COLORS, catArr } = this.props;

    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({
    //   cx,
    //   cy,
    //   midAngle,
    //   innerRadius,
    //   outerRadius,
    //   percent,
    //   index,
    // }) => {
    //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //   return (
    //     <text
    //       x={x}
    //       y={y}
    //       fill="white"
    //       textAnchor={x > cx ? 'start' : 'end'}
    //       dominantBaseline="central"
    //     >
    //       {`${(percent * 100).toFixed(0)}%`}
    //     </text>
    //   );
    // };

    return (
      <div className="pie-graph-container">
        <ResponsiveContainer width="100%" aspect={1.5}>
          <PieChart>
            <Pie
              // cx={400}
              // cy={300}
              data={catArr}
              dataKey="price"
              nameKey="price"
              // outerRadius={100}
              labelLine={false}
              // label={renderCustomizedLabel}
              // fill="blue"
              label
              // isAnimationActive={false}
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
