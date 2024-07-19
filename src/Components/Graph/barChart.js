import React from "react";
import { Bar } from "react-chartjs-2";
import "./toggle.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels
);

const BarChartWithGoal = ({ data }) => {
  // console.log(data);
  const labels = data.json_data.map((d) => d.label);
  const values = data.json_data.map((d) => d.value);
  // const goal = data.chartElements.barLineChart.goalValue;
  // const labelText = data.chartElements.barLineChart.goalLabel;

  const ChartData = {
    labels: labels,
    datasets: [
      {
        label: data.chartElements.barLineChart.xaxis,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
            // goalLabel: {
            //   content: `${labelText}: ${goal}`,
            //   enabled: true,
            //   position: "end",
            //   backgroundColor: "rgba(0,0,0,0.8)",
            //   color: "red",
            //   yAdjust: -10, // Adjust the position slightly above the line
            // },
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
          // maxRotation:
          //   data.chartElements.barLineChart.showLineAndMarks === "Rotate 90°"
          //     ? 90
          //     : 0,
          // minRotation:
          //   data.chartElements.barLineChart.showLineAndMarks === "Rotate 45°"
          //     ? 45
          //     : 0,
        },
      },
      y: {
        title: {
          display: data.chartElements.barLineChart.yShowLabel,
          text: data.chartElements.barLineChart.yaxis,
        },
        ticks: {
          display: data.chartElements.barLineChart.yshowLineAndMarks !== "Hide",
          // autoSkip: true,
          // maxRotation:
          //   data.chartElements.barLineChart.yshowLineAndMarks === "Rotate 90°"
          //     ? 90
          //     : 0,
          // minRotation:
          //   data.chartElements.barLineChart.yshowLineAndMarks === "Rotate 45°"
          //     ? 45
          //     : 0,
        },
      },
    },
  };

  return (
    <div className="chart-bar">
      <Bar data={ChartData} options={options} />
    </div>
  );
};

export default BarChartWithGoal;
