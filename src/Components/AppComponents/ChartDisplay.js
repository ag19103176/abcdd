import React from "react";
import "../Graph/toggle.css";
import "./card.css";
import PieChart from "../Graph/pieChart";
import BarChart from "../Graph/barChart";
import LineChart from "../Graph/lineChart";
import SumDisplay from "../DataDisplayAxes/sumDisplay";
import AvgDisplay from "../DataDisplayAxes/avgDisplay";

const ChartDisplay = ({ d }) => {
  return (
    <>
      {d.chartType === "1" ? (
        <PieChart data={d} />
      ) : d.chartType === "2" ? (
        <BarChart data={d} />
      ) : d.chartType === "3" ? (
        <LineChart data={d} />
      ) : d.chartBasic === "2" && d.chartNum === "1" ? (
        <SumDisplay totalSum={d} />
      ) : d.chartBasic === "2" && d.chartNum === "2" ? (
        <AvgDisplay totalSum={d} />
      ) : (
        <div>Invalid chart type</div>
      )}
    </>
  );
};

export default ChartDisplay;
