import React from "react";

const SumDisplay = ({ totalSum }) => {
  // console.log(totalSum.chartElements.sumChart.getSum);
  const data = totalSum.chartElements.sumChart.getSum;
  return (
    <div className="chart-body">
      {data !== null && <h1>Total Sum: {data}</h1>}
    </div>
  );
};

export default SumDisplay;
