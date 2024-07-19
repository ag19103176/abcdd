import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./toggle.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomPieChart = ({ data }) => {
  // console.log(data);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const l = data.json_data.map((d) => d.label);
  const v = data.json_data.map((d) => d.value);
  const totalItems = l.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
    boxWidth: 20,
  };

  const dd = {
    labels: l,
    datasets: [
      {
        label: data.field1,
        data: v,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const legendItems = l.map((label, index) => ({
    text: label,
    fillStyle: dd.datasets[0].backgroundColor[index % 6],
    hidden: true,
  }));

  const paginatedLegendItems = legendItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="chart-body">
      <Pie data={dd} options={options} width={300} height={500} />

      {data.chartElements.pieChart.total && (
        <div>
          Total:
          {data.chartElements.pieChart.total
            ? data.chartElements.pieChart.getSum
            : ""}
        </div>
      )}

      {data.chartElements.pieChart.legend && (
        <div className="custom-legend">
          {paginatedLegendItems.map((item, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: item.fillStyle }}
              ></span>
              <span className="legend-text">{item.text}</span>
            </div>
          ))}

          {totalItems > 9 && (
            <div className="pagination-controls">
              <button onClick={handlePrevious} disabled={currentPage === 0}>
                &lt;
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
