import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register required Chart.js components and plugins
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels
);

const LineChartWithGoal = ({ data }) => {
  const labels = data.json_data.map((d) => d.label);
  const values = data.json_data.map((d) => d.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: data.chartElements.barLineChart.xaxis,
        data: values,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      annotation: {
        annotations: {
          goalLine: {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: data.chartElements.barLineChart.goalValue,
            borderColor: "red",
            borderWidth: 2,
          },
        },
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        formatter: (value, context) => {
          if (data.chartElements.barLineChart.valueToShow === "All") {
            return value;
          } else if (data.chartElements.barLineChart.valueToShow === "Some") {
            return context.dataIndex % 2 === 0 ? value : "";
          }
          return "";
        },
      },
    },
    scales: {
      x: {
        title: {
          display: data.chartElements.barLineChart.showLabel,
          text: data.chartElements.barLineChart.xaxis,
        },
        ticks: {
          display: data.chartElements.barLineChart.showLineAndMarks !== "Hide",
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: data.chartElements.barLineChart.yShowLabel,
          text: data.chartElements.barLineChart.yaxis,
        },
        ticks: {
          display: data.chartElements.barLineChart.yshowLineAndMarks !== "Hide",
          autoSkip: true,
        },
      },
    },
  };
  return (
    <div className="chart-bar">
      <Line data={chartData} options={options} />
    </div>
  );
  // return <Line data={chartData} options={options} />;
};

export default LineChartWithGoal;
