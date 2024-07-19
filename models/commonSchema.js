const mongoose = require("mongoose");

// Define subschema for pie chart configurations
const PieChartSchema = new mongoose.Schema(
  {
    dimension: {
      type: String,
    },
    measure: {
      type: String,
    },
    legend: {
      type: Boolean,
    },
    total: {
      type: Boolean,
    },
    selectPercentage: {
      type: String,
    },
    minSlicePercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { _id: false }
);

// Define subschema for bar and line chart configurations
const BarLineChartSchema = new mongoose.Schema(
  {
    xaxis: {
      type: String,
    },
    yaxis: {
      type: String,
    },
    goalLine: {
      type: Boolean,
      default: false,
    },
    goalValue: {
      type: Number,
      default: null,
    },
    // goalLabel: {
    //   type: String,
    //   default: null,
    // },
    showValues: {
      type: Boolean,
      default: false,
    },
    valueToShow: {
      type: String,
      default: null,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    // xlabel: {
    //   type: String,
    //   default: null,
    // },
    showLineAndMarks: {
      type: String,
      default: null,
    },
    yShowLabel: {
      type: Boolean,
      default: null,
    },
    // yLabel: {
    //   type: String,
    //   default: null,
    // },
    yshowLineAndMarks: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

// Define subschema for sum numeric configurations
const SumChartSchema = new mongoose.Schema(
  {
    field: {
      type: String,
    },
  },
  { _id: false }
);

// Define subschema for avg numeric configurations
const AvgChartSchema = new mongoose.Schema(
  {
    field: {
      type: String,
    },
  },
  { _id: false }
);
const UserAnalyticsChartsSchema = new mongoose.Schema({
  graph: [
    {
      companyId: {
        type: Number,
        required: true,
        default: 0,
      },
      userId: {
        type: Number,
        required: true,
        default: 0,
      },
      isDeleted: {
        type: Boolean,
        default: false,
        // required: true,
      },
      chartSource: {
        type: String,
        required: true,
        default: 0,
      },
      chartBasic: {
        type: String,
        default: null,
      },
      chartType: {
        type: String,
        default: 0,
      },
      chartNum: {
        type: String,
        default: 0,
      },
      dashlet: {
        type: String,
      },
      layout: {
        x: {
          type: Number,
          default: 0,
        },
        y: {
          type: Number,
          default: 0,
        },
        w: {
          type: Number,
          default: 0,
        },
        h: {
          type: Number,
          default: 0,
        },
      },
      chartElements: {
        pieChart: PieChartSchema,
        barLineChart: BarLineChartSchema,
        sumChart: SumChartSchema,
        avgChart: AvgChartSchema,
      },
    },
  ],
});

const UserAnalyticsCharts = mongoose.model(
  "UserAnalyticsCharts",
  UserAnalyticsChartsSchema
);
module.exports = UserAnalyticsCharts;
