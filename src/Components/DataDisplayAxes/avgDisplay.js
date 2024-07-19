import React from "react";

const avgDisplay = ({ totalSum }) => {
  const data = totalSum.chartElements.sumChart.getSum;
  return (
    <div className="chart-body">
      {data !== null && <h1> Total Avg: {data}</h1>}
    </div>
  );
};

export default avgDisplay;
