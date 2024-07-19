import React from "react";
import bar from "../../assets/line.png";
import numeric from "../../assets/numeric.png";
import line from "../../assets/line.png";
import pie from "../../assets/pie.png";
import "../Graph/toggle.css";
import "./card.css";

const ChartTypeLabel = ({ d }) => {
  // console.log("data", d);
  return (
    <div className="label-black">
      {d.chartType === "1" && (
        <span>
          <img src={pie} alt="Pie Chart Icon" className="source-icon" />
          {d.dashlet === "" ? "Pie Chart" : d.dashlet}
        </span>
      )}
      {d.chartType === "2" && (
        <span>
          <img src={bar} alt="Bar Chart Icon" className="source-icon" />
          {d.dashlet === "" ? "Bar Chart" : d.dashlet}
        </span>
      )}
      {d.chartType === "3" && (
        <span>
          <img src={line} alt="Line Chart Icon" className="source-icon" />
          {d.dashlet === "" ? "Line Chart" : d.dashlet}
        </span>
      )}
      {d.chartBasic === "2" && d.chartNum === "1" && (
        <span>
          <img src={numeric} alt="Numeric Icon" className="source-icon" />
          {d.dashlet === "" ? "Numeric" : d.dashlet}
        </span>
      )}
      {d.chartBasic === "2" && d.chartNum === "2" && (
        <span>
          <img src={numeric} alt="Numeric Icon" className="source-icon" />
          {d.dashlet === "" ? "Numeric" : d.dashlet}
        </span>
      )}
    </div>
  );
};

export default ChartTypeLabel;
