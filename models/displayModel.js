const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const displaySchema = new mongoose.Schema(
  {
    legend: {
      type: Boolean,
    },
    total: {
      type: String,
    },
    selectPercentage: {
      type: String,
    },
    minimunSlicePercentage: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const displayschema = mongoose.model("displayschema", displaySchema);
module.exports = displayschema;
