const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const CommonSchema = require("../models/commonSchema");
const Customer = require("../models/customerModel");
const customerData = require("../src/data1/customer.json");
const Invoice = require("../models/invoiceModel");
const invoiceData = require("../src/data1/invoice.json");
const db = require("../db");
const Joi = require("joi");
const { layouts } = require("chart.js");
const schemas = {
  customers: Customer,
  commonschemas: CommonSchema,
  invoices: Invoice,
};

router.get("/createCustomerTable", async (req, res) => {
  try {
    await Customer.createCollection();
    console.log("Collection created successfully");
    res.status(200).send("Collection created successfully");
  } catch (err) {
    console.error("Error creating collection: ", err.message);
    res.status(500).send("Error creating collection");
  }
});
router.get("/createInvoiceTable", async (req, res) => {
  try {
    await Invoice.createCollection();
    console.log("Collection created successfully");
    res.status(200).send("Collection created successfully");
  } catch (err) {
    console.error("Error creating collection: ", err.message);
    res.status(500).send("Error creating collection");
  }
});

router.post("/insertCustomerTable", async (req, res) => {
  try {
    await Customer.insertMany(customerData);
    console.log("Records inserted successfully");
    res.status(200).send("Records inserted successfully");
  } catch (err) {
    console.error("Error inserting records: ", err.message);
    res.status(500).send("Error inserting records");
  }
});
router.get("/measure", async (req, res) => {
  try {
    const { chartSource, field2 } = req.query;

    if (!chartSource || !field2) {
      return res.status(400).send("Table name and field1 are required.");
    }
    const response = await schemas[chartSource].aggregate([
      {
        $group: {
          _id: "null",
          totalSum: { $sum: { $toDouble: `$${field2}` } },
        },
      },
    ]);
    res.send({
      status: 200,
      msg: "Sum computed successfully",
      data: response,
    });
  } catch (err) {
    console.error("Error computing sum: ", err.message);
    res.status(500).send("Error computing sum");
  }
});
router.post("/insertInvoiceTable", async (req, res) => {
  try {
    await Invoice.insertMany(invoiceData);
    console.log("Records inserted successfully");
    res.status(200).send("Records inserted successfully");
  } catch (err) {
    console.error("Error inserting records: ", err.message);
    res.status(500).send("Error inserting records");
  }
});

router.get("/getAllData", async (req, res) => {
  const { chartSource } = req.query;
  // console.log("Table name:", chartSource);
  try {
    if (!chartSource || !schemas[chartSource]) {
      console.error("Invalid table name:", chartSource);
      return res.status(400).send("Invalid table name");
    }
    const data = await schemas[chartSource].find();
    res.send(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Error fetching data");
  }
});

// router.get("/getGroup", async (req, res) => {
//   try {
//     const { chartSource, field1, field2 } = req.query;

//     if (!chartSource || !field1 || !field2) {
//       return res.status(400).send("Table name and fields are required.");
//     }
//     const response = await schemas[chartSource].aggregate([
//       { $group: { _id: `$${field1}`, value: { $sum: 1 } } },
//       { $project: { _id: 0, label: `$_id`, value: 1 } },
//     ]);
//     console.log(response);
//     res.send({
//       status: 200,
//       msg: "Request processed successfully",
//       data: response,
//     });
//   } catch (err) {
//     console.error("Error fetching data: ", err.message);
//     res.status(500).send("Error fetching data");
//   }
// });

router.get("/getGroup", async (req, res) => {
  try {
    const { chartSource, field1, field2 } = req.query;

    // Validate required parameters
    if (!chartSource || !field1 || !field2) {
      return res.status(400).send("Table name and fields are required.");
    }
    let pipeline = [];
    console.log(typeof field2);
    if (typeof field2 === "number") {
      pipeline = [
        {
          $match: {
            [field2]: {
              $ne: null,
            },
          },
        },

        {
          $set: {
            count_string: {
              $toString: `$${field2}`,
            },
          },
        },
        {
          $set: {
            len: {
              $strLenCP: "$count_string",
            },
            label: "$name",
          },
        },
        {
          $group: {
            _id: null,
            max_len: {
              $max: "$len",
            },
            docs: {
              $push: "$$ROOT",
            },
            total: {
              $sum: `$${field2}`,
            },
          },
        },
        {
          $set: {
            "docs.max_len": "$max_len",
          },
        },
        {
          $set: {
            max_array: {
              $filter: {
                input: "$docs",
                as: "item",
                cond: {
                  $eq: ["$$item.len", "$max_len"],
                },
              },
            },
            non_array: {
              $filter: {
                input: "$docs",
                as: "item",
                cond: {
                  $lt: ["$$item.len", "$max_len"],
                },
              },
            },
          },
        },
        {
          $addFields: {
            non_max_total: {
              $sum: `$non_array.${field2}`,
            },
          },
        },
        {
          $unwind: {
            path: "$max_array",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            other: [
              {
                label: "other",
                value: "$non_max_total",
                percent: {
                  $multiply: [
                    100,
                    {
                      $divide: ["$non_max_total", "$total"],
                    },
                  ],
                },
              },
            ],
            max: {
              label: `$max_array.${field1}`,
              value: `$max_array.${field2}`,
              percent: {
                $multiply: [
                  100,
                  {
                    $divide: [`$max_array.${field2}`, "$total"],
                  },
                ],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            other: {
              $first: "$other",
            },
            max: {
              $push: "$max",
            },
          },
        },
        {
          $addFields: {
            item: {
              $concatArrays: ["$other", "$max"],
            },
          },
        },
        {
          $unwind: {
            path: "$item",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $replaceRoot: {
            newRoot: "$item",
          },
        },
        // {
        //   $match: {
        //     value: {
        //       $ne: 0,
        //     },
        //     percent: {
        //       $ne: 0,
        //     },
        //   },
        // },
      ];
    } else {
      pipeline = [
        {
          $match: {
            [field2]: {
              $ne: null,
            },
          },
        },
        {
          $set: {
            count_string: {
              $toString: `$${field2}`,
            },
          },
        },
        {
          $set: {
            count_string: {
              $cond: {
                if: { $eq: [`$${field2}`, true] },
                then: "1",
                else: "0",
              },
            },
          },
        },
        {
          $group: {
            _id: "$count_string",
            count_false: { $sum: 1 },
            docs: { $push: "$$ROOT" },
          },
        },
        {
          $set: {
            true_value: {
              $filter: {
                input: "$docs",
                as: "item",
                cond: { $eq: ["$$item.count_string", "1"] },
              },
            },
            false_value: {
              $cond: {
                if: { $eq: ["$_id", "0"] },
                then: "1",
                else: "0",
              },
            },
          },
        },
        {
          $addFields: {
            other: [
              {
                id: "$true_value._id",
                label: "other",
                value: "false",
              },
            ],
            true_obj: {
              id: "$true_value._id",
              label: `$true_value.${field1}`,
              value: `$true_value.${field2}`,
            },
          },
        },
        {
          $match: {
            _id: { $eq: "1" },
          },
        },
        {
          $unwind: {
            path: "$true_obj.label",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$true_obj.value",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$true_obj.id",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            other: 1,
            true_obj: 1,
          },
        },
        {
          $group: {
            _id: null,
            true_obj: {
              $addToSet: {
                id: "$true_obj.id",
                label: "$true_obj.label",
                value: "$true_obj.value",
              },
            },
            false_obj: {
              $first: "$other",
            },
          },
        },
        {
          $set: {
            true_obj: {
              $concatArrays: ["$true_obj", "$false_obj"],
            },
          },
        },
        {
          $unwind: {
            path: "$true_obj",
          },
        },
        {
          $project: {
            id: "$true_obj.id",
            label: "$true_obj.label",
            value: "$true_obj.value",
            _id: 0,
          },
        },
        {
          $group: {
            _id: "$id",
            data: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            label: { $first: "$data.label" },
            value: { $first: "$data.value" },
            _id: 0,
          },
        },
      ];
    }
    // Perform aggregation
    const response = await schemas[chartSource].aggregate(pipeline);

    console.log(response);

    res.send({
      status: 200,
      msg: "Request processed successfully",
      data: response,
    });
  } catch (err) {
    console.error("Error fetching data: ", err.message);
    res.status(500).send("Error fetching data");
  }
});

const saveSchema = Joi.object({
  companyId: Joi.string(),
  userId: Joi.string(),
  isDeleted: Joi.boolean(),
  chartSource: Joi.string().required(),
  chartBasic: Joi.number().required(),
  chartType: Joi.string(),
  chartNum: Joi.alternatives().conditional("chartBasic", {
    is: "1",
    then: Joi.string().allow(""),
    otherwise: Joi.string().allow(""),
  }),
  dashlet: Joi.string().allow(""),
  layout: Joi.array(),
  chartElements: Joi.object({
    pieChart: Joi.object({
      dimension: Joi.string().required(),
      measure: Joi.string().required(),
      legend: Joi.boolean(),
      total: Joi.boolean(),
      selectPercentage: Joi.string().allow(""),
      minSlicePercentage: Joi.number()

        .empty("")
        .default(null)
        .min(0)
        .max(100),
    }),
    sumChart: Joi.object({
      field: Joi.string().required(),
    }),
    avgChart: Joi.object({
      field: Joi.string().required(),
    }),
    barLineChart: Joi.object({
      xaxis: Joi.string().required(),
      yaxis: Joi.string().required(),
      goalLine: Joi.boolean().allow(),
      goalValue: Joi.number().empty("").min(0).max(100),
      showValues: Joi.boolean().default(false),
      valueToShow: Joi.string().allow(""),
      showLabel: Joi.boolean().default(false),
      showLineAndMarks: Joi.string().allow(""),
      yShowLabel: Joi.boolean().default(false),
      yshowLineAndMarks: Joi.string().allow(""),
    }),
  }),
});
router.post("/saveGraph", async (req, res) => {
  const {
    companyId,
    userId,
    isDeleted,
    chartSource,
    chartBasic,
    chartType,
    chartNum,
    dashlet,
    layout,
    chartElements,
  } = req.body;

  try {
    const newEntry = new CommonSchema({
      graph: [
        {
          companyId,
          userId,
          isDeleted,
          chartSource,
          chartBasic,
          chartType,
          chartNum,
          dashlet,
          layout,
          chartElements,
        },
      ],
    });

    console.log("in save", newEntry);

    await newEntry.save();
    res.send({ msg: "Data saved successfully" });
  } catch (err) {
    console.error("Error in saving graph data: ", err.message);
    res.status(500).send("Error in saving graph data");
  }
});

router.patch("/updateGraphPositions/:_id", async (req, res) => {
  try {
    const objid = req.params._id;
    const updatedGraphs = req.body;
    const graphObject = await CommonSchema.findOne({ _id: objid });
    if (!graphObject) {
      return res.status(404).json({ message: "Parent object not found" });
    }
    updatedGraphs.forEach(({ id, x, y, w, h }) => {
      const graphToUpdate = graphObject.graph.find((graph) => graph.id === id);
      if (graphToUpdate) {
        graphToUpdate.layout.x = x;
        graphToUpdate.layout.y = y;
        graphToUpdate.layout.w = w;
        graphToUpdate.layout.h = h;
      }
    });
    const updatedObject = await graphObject.save();

    res.send({
      message: "Graph positions updated successfully",
      updatedObject,
    });
  } catch (err) {
    console.error("Error updating graph positions:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/saveGraph", async (req, res) => {
  try {
    const validatedData = await saveSchema
      .validateAsync(req.body)
      .catch((error) => {
        throw new Error(
          error.details
            ? error.details.map((err) => err.message).join(", ")
            : error.message
        );
      });
    console.log("Validation successful:", validatedData);

    const data = req.body;
    const latestGraph = await CommonSchema.findOne({});
    if (!latestGraph) {
      throw new Error("No graph found in the database");
    }
    const { _id } = latestGraph;
    const graph = [...latestGraph.graph, data];

    const response = await CommonSchema.findByIdAndUpdate(_id, { graph });
    res.send({ response });
  } catch (err) {
    console.error("Error in saving graph data:", err.message);
    res.status(400).send({
      error: err.message,
    });
  }
});

router.get("/getGraph", async (req, res) => {
  try {
    const data = await CommonSchema.find({});
    res.send(data);
  } catch (err) {
    console.error("Error fetching data from MongoDB: " + err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/getMeasure", async (req, res) => {
  const { chartSource } = req.query;
  // console.log("Table name:", chartSource);
  try {
    if (!chartSource || !schemas[chartSource]) {
      console.error("Invalid table name:", chartSource);
      return res.status(400).send("Invalid table name");
    }
    let data;
    if (chartSource === "customers") {
      data = [
        "root_parent_id",
        "parent_id",
        "deleted_at",
        "ready_for_sync",
        "created_user_id",
        "updated_user_id",
        "is_active",
        "is_deleted",
        "skip_level",
        "is_prospect",
      ];
    } else if (chartSource === "invoices") {
      data = ["Apoorva", "babyPanda", "riyaa", "panda", "baby"];
    }
    res.send(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).send("Error fetching data");
  }
});
router.patch("/deleteGraph/:id", async (req, res) => {
  try {
    const graphId = req.body;
    const _id = req.params.id;
    const graphs = await CommonSchema.findOne({ _id: _id });
    console.log(graphs);
    let graph = [];
    for (const item of graphs.graph) {
      if (item._id != graphId.id) {
        graph.push(item);
      }
    }
    const response = await CommonSchema.findByIdAndUpdate(_id, { graph });
    res.send(response);
    console.log(graph);
  } catch (err) {
    console.error("Error deleting graph entry:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/updateGraph/:objid/:id", async (req, res) => {
  try {
    const objid = req.params.objid;
    const id = req.params.id;
    let updatedData = req.body;
    const graphs = await CommonSchema.findOne({ objid });
    const graph = [];

    for (const item of graphs.graph) {
      let temp = item._id;
      if (temp != id) {
        graph.push(item);
      } else graph.push(updatedData);
    }
    const response = await CommonSchema.findByIdAndUpdate(objid, { graph });
    res.send(response);
    // console.log(graph);
    if (!response) {
      return res.status(404).json({ message: "Document not found" });
    }
  } catch (err) {
    console.error("Error updating document:", err.message);
    res.status(500).json({ message: "Error updating document" });
  }
});
router.get("/getAvg", async (req, res) => {
  try {
    const { chartSource, field1 } = req.query;
    if (!chartSource || !field1) {
      return res.status(400).send("Table name and fields are required.");
    }
    const response = await schemas[chartSource].aggregate([
      {
        $group: {
          _id: "null",
          totalSum: { $avg: { $toDouble: `$${field1}` } },
        },
      },
    ]);
    // const response = await schemas[chartSource].aggregate(aggregation).exec();
    res.send({
      status: 200,
      msg: "Request processed successfully",
      data: response,
    });
  } catch (err) {
    console.error("Error fetching data: ", err.message);
    res.status(500).send("Error fetching data");
  }
});

router.get("/getSum", async (req, res) => {
  try {
    const { chartSource, field1 } = req.query;

    if (!chartSource || !field1) {
      return res.status(400).send("Table name and field1 are required.");
    }
    const response = await schemas[chartSource].aggregate([
      {
        $group: {
          _id: "null",
          totalSum: { $sum: { $toDouble: `$${field1}` } },
        },
      },
    ]);
    res.send({
      status: 200,
      msg: "Sum computed successfully",
      data: response,
    });
  } catch (err) {
    console.error("Error computing sum: ", err.message);
    res.status(500).send("Error computing sum");
  }
});
router.get("/getConsolidatedGraph", async (req, res) => {
  try {
    const graphResponse = await axios.get("http://localhost:8000/api/getGraph");
    const graphData = graphResponse.data;

    if (graphData.length > 0) {
      for (const dd of graphData[0].graph) {
        if (dd.chartBasic === "1") {
          const response = await axios.get(
            "http://localhost:8000/api/getGroup",
            {
              params: {
                chartSource: dd.chartSource,
                field1:
                  dd.chartType === "1"
                    ? dd.chartElements.pieChart.dimension
                    : dd.chartElements.barLineChart.xaxis,
                field2:
                  dd.chartType === "1"
                    ? dd.chartElements.pieChart.measure
                    : dd.chartElements.barLineChart.yaxis,
              },
            }
          );

          const dataLabel = response.data.data.map((item) => ({
            label: item.label == null ? "nolabel" : item.label,
            value: item.value == null ? "1" : item.value,
          }));
          dd.json_data = dataLabel;
          let x;
          if (dd.chartType === "1" && dd.chartElements.pieChart.total) {
            x = await axios.get(`http://localhost:8000/api/getSum`, {
              params: {
                chartSource: dd.chartSource,
                field1: dd.chartElements.pieChart.measure,
              },
            });
            const res = x.data;
            const totalSum = res.data[0].totalSum;
            dd.chartElements.pieChart.getSum = totalSum;
          }
        } else if (dd.chartBasic === "2") {
          let x;
          if (dd.chartNum === "1") {
            x = await axios.get(`http://localhost:8000/api/getSum`, {
              params: {
                chartSource: dd.chartSource,
                field1: dd.chartElements.sumChart.field,
              },
            });
          } else if (dd.chartNum === "2") {
            x = await axios.get(`http://localhost:8000/api/getAvg`, {
              params: {
                chartSource: dd.chartSource,
                field1: dd.chartElements.sumChart.field,
              },
            });
          }

          const res = x.data;
          const totalSum = res.data[0].totalSum;
          dd.chartElements.sumChart.getSum = totalSum;
        }
      }
    }

    res.json(graphData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// router.get("/getGraph", async (req, res) => {
//   try {
//     const data = await CommonSchema.find({});
//     const filteredData = data.map((doc) => ({
//       _id: doc._id,
//       graph: doc.graph.filter((entry) => !entry.isDeleted),
//     }));
//     // console.log(filteredData);
//     res.send(filteredData);
//   } catch (err) {
//     console.error("Error fetching data from MongoDB: " + err);
//     res.status(500).send("Internal Server Error");
//   }
// });

///soft delete
// router.patch("/deleteGraph/:id", async (req, res) => {
//   try {
//     const graphId = req.body;
//     const _id = req.params.id;
//     const graphs = await CommonSchema.findOne({ _id: _id });
//     // console.log(graphs);
//     let graph = [];
//     for (const item of graphs.graph) {
//       if (item._id == graphId.id) {
//         item.isDeleted = true;
//       }
//       graph.push(item);
//     }
//     const response = await CommonSchema.findByIdAndUpdate(_id, { graph });
//     res.send(response);
//     // console.log(graph);
//   } catch (err) {
//     console.error("Error deleting graph entry:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
