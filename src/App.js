import React, { useEffect, useState } from "react";
import axios from "axios";
import DataDisplayComponent from "./Components/DataDisplayAxes/CommonDisplay.js";
import Loader from "./Components/Loader/loader.js";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./App.css";
import Select from "react-select";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChartCard from "./Components/AppComponents/ChartCard.js";
import sourceIcon from "./assets/source.png";
import numeric from "./assets/numeric.png";
import graphIcon from "./assets/graph.png";
import customer from "./assets/customer.png";
import dashlet from "./assets/dashlet.png";
import refreshIcon from "./assets/refresh.png";
import refreshWhite from "./assets/refreshWhite.png";
import bar from "./assets/bar.png";
import reorderIcon from "./assets/reorder.png";
import pieBlack from "./assets/pieBlack.png";
import tick from "./assets/tick.png";
import tickRed from "./assets/tickRed.png";
import addIcon from "./assets/add.png";
import numericBlack from "./assets/numericBlack.png";
import lineBlack from "./assets/lineBlack.png";
import sum from "./assets/sum.png";
import invoiceBlack from "./assets/invoiceBlack.png";
import avg from "./assets/avg.png";
import ticket from "./assets/ticket.png";
const mongoose = require("mongoose");
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function App() {
  const sources = [
    { name: "customers" },
    { name: "invoices" },
    { name: "ticket" },
  ];
  const basic = [
    { name: "Graph", identificationId: 1 },
    { name: "Numeric", identificationId: 2 },
  ];
  const structures = [
    { name: "Pie Graph", id: 1 },
    { name: "Bar Graph", id: 2 },
    { name: "Line Graph", id: 3 },
  ];
  const abc = [
    { name: "Sum", idc: 1 },
    { name: "Average", idc: 2 },
  ];
  const xyz = [
    "root_parent_id",
    "parent_id",
    "deleted_at",
    "created_user_id",
    "updated_user_id",
    "is_prospect",
  ];

  const [selectedSource, setSelectedSource] = useState("");
  const [dim, setDim] = useState("");
  const [measure, setMeasure] = useState("");
  const [type, setType] = useState("");
  const [num, setNum] = useState("");
  const [displayGraph, setDisplayGraph] = useState([]);
  const [graph, setGraph] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [graphEdit, setGraphEdit] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [legend, setLegend] = useState(false);
  const [total, setTotal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState([]);
  const [isDraggable, setIsDraggable] = useState(false);
  const [objid, setObjid] = useState("");
  const [selectPercentage, setSelectPercentage] = useState("");
  const [slicePercentage, setSlicePercentage] = useState("");
  const [goalLine, setGoalLine] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [goalValue, setGoalValue] = useState();
  const [goalLabel, setGoalLabel] = useState("");
  const [valueToShow, setRadioshowValues] = useState("");
  const [identify, setIdentify] = useState();
  const [totalSum, setTotalSum] = useState(0);
  const [showLabel, setShowLabel] = useState(true);
  const [yShowLabel, setyShowLabel] = useState(true);
  const [xlabel, setxLabel] = useState("");
  const [yLabel, setyLabel] = useState("");
  const [showLineAndMarks, setshowLineAndMarks] = useState("");
  const [yshowLineAndMarks, setyshowLineAndMarks] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [dash, setDash] = useState("");

  var refreshInterval;
  const handleRefreshClick = (val) => {
    setRefreshToggle(!refreshToggle);
    setRefresh(val);
    if (val === 0) clearInterval(refreshInterval);
    else
      refreshInterval = setInterval(() => {
        setGraph(!graph);
      }, val * 1000);
    console.log("dfs", val);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getConsolidatedGraph"
        );
        const data = response.data;
        if (data.length > 0) {
          setObjid(() => data[0]._id);
          setDisplayGraph(data[0].graph);
          var temp = data[0].graph.map((g, index) => {
            return { ...g.layout, i: index };
          });
          setLayout(temp);
        }
      } catch (error) {
        console.log("error in app js ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [graph]);

  const handleEdit = async (graphData) => {
    setLoading(true);
    console.log(graphData);
    setSelectedSource(graphData.chartSource);
    setIdentify(graphData.chartBasic);
    setNum(graphData.chartNum);
    setDash(graphData.dashlet);
    setType(graphData.chartType);
    setId(graphData._id);
    if (graphData.chartType === "1") {
      console.log(graphData.chartElements.pieChart.dimension);
      setDim(graphData.chartElements.pieChart.dimension);
      setMeasure(graphData.chartElements.pieChart.measure);
      setLegend(graphData.chartElements.pieChart.legend);
      setTotal(graphData.chartElements.pieChart.total);
      setSelectPercentage(graphData.chartElements.pieChart.selectPercentage);
      setSlicePercentage(graphData.chartElements.pieChart.minSlicePercentage);
    } else if (graphData.chartType === "2" || graphData.chartType === "3  ") {
      setDim(graphData.chartElements.barLineChart.xaxis);
      setMeasure(graphData.chartElements.barLineChart.yaxis);
      setGoalLine(graphData.chartElements.barLineChart.goalLine);
      setGoalValue(graphData.chartElements.barLineChart.goalValue);
      setGoalLabel(graphData.chartElements.barLineChart.goalLabel);
      setShowValues(graphData.chartElements.barLineChart.showValues);
      setRadioshowValues(graphData.chartElements.barLineChart.valueToShow);
      setShowLabel(graphData.chartElements.barLineChart.showLabel);
      setyShowLabel(graphData.chartElements.barLineChart.yShowLabel);
      setxLabel(graphData.chartElements.barLineChart.xlabel);
      setyLabel(graphData.chartElements.barLineChart.yLabel);
      setshowLineAndMarks(
        graphData.chartElements.barLineChart.showLineAndMarks
      );
      setyshowLineAndMarks(
        graphData.chartElements.barLineChart.yshowLineAndMarks
      );
    }
    setShowModal(true);
    setAddButton(true);
    setGraphEdit(true);
    setLoading(false);
  };
  const handleGenerateGraphClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/getGroup", {
        params: {
          chartSource: selectedSource,
          field1: dim,
          field2: measure,
        },
      });
      const requestData = {
        chartSource: selectedSource,
        chartBasic: identify,
        chartType: type,
        chartNum: num,
        dashlet: dash,
        layout: layout,
        chartElements: {},
      };
      if (type === "1") {
        requestData.chartElements = {
          pieChart: {
            dimension: dim,
            measure: measure,
            legend: legend,
            total: total,
            selectPercentage: selectPercentage,
            minSlicePercentage: slicePercentage,
          },
        };
      } else if (type === "2" || type === "3") {
        requestData.chartElements = {
          barLineChart: {
            xaxis: dim,
            yaxis: measure,
            goalLine: goalLine,
            goalValue: goalValue,
            showValues: showValues,
            valueToShow: valueToShow,
            showLabel: showLabel,
            showLineAndMarks: showLineAndMarks,
            yShowLabel: yShowLabel,
            yshowLineAndMarks: yshowLineAndMarks,
          },
        };
      }

      if (displayGraph.length == 0 && objid === "") {
        const newId = mongoose.Types.ObjectId();
        setObjid(newId);
        requestData._id = newId;
        console.log(requestData);
        await axios.post("http://localhost:8000/api/saveGraph", requestData);
      } else {
        await axios.patch("http://localhost:8000/api/saveGraph", requestData);
      }

      setGraph(!graph);
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleGenerateEditGraph = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/getGroup", {
        params: {
          chartSource: selectedSource,
          field1: dim,
          field2: measure,
        },
      });
      const dataLabel = response.data.data.map((item) => ({
        label: item.label == null ? "nolabel" : item.label,
        value: item.value == null ? "1" : item.value,
      }));
      const updatedData = {
        chartSource: selectedSource,
        json_data: dataLabel,
        chartBasic: identify,
        chartType: type,
        chartNum: num,
        dashlet: dash,
        layout: layout,
        chartElements: {},
      };
      if (type === "1") {
        updatedData.chartElements = {
          pieChart: {
            dimension: dim,
            measure: measure,
            legend: legend,
            total: total,
            selectPercentage: selectPercentage,
            minSlicePercentage: slicePercentage,
          },
        };
      } else if (type === "2" || type === "3") {
        updatedData.chartElements = {
          barLineChart: {
            xaxis: dim,
            yaxis: measure,
            goalLine: goalLine,
            goalValue: goalValue,
            showValues: showValues,
            valueToShow: valueToShow,
            showLabel: showLabel,
            showLineAndMarks: showLineAndMarks,
            yShowLabel: yShowLabel,
            yshowLineAndMarks: yshowLineAndMarks,
          },
        };
      }
      await axios.patch(
        `http://localhost:8000/api/updateGraph/${objid}/${id}`,
        updatedData
      );
      setId("");
      setShowModal(false);
      setAddButton(false);
      setDash("");
      setLegend(false);
      setTotal(false);
      setSelectPercentage("");
      setSlicePercentage("");
      setGoalLine(false);
      setRadioshowValues("");
      setGoalValue();
      setShowValues(false);
      setGoalLabel("");
      setShowLabel(true);
      setyShowLabel(true);
      setxLabel("");
      setyLabel("");
      setshowLineAndMarks("");
      setyshowLineAndMarks("");
      setGraph(!graph);
    } catch (error) {
      console.error("Error updating graph:", error.message);
    }
    setLoading(false);
  };

  const handleEditCount = async (graphData) => {
    setLoading(true);
    setSelectedSource(graphData.chartSource);
    setIdentify(graphData.chartBasic);
    setNum(graphData.chartNum);
    setDash(graphData.dashlet);
    setId(graphData._id);
    setShowModal(true);
    setAddButton(true);
    setGraphEdit(true);
    setLoading(false);
  };
  const handleGenerateCount = async () => {
    try {
      if (num === "1") {
        var response = await fetch(
          `http://localhost:8000/api/getSum?chartSource=${selectedSource}&field1=${dim}`
        );
      } else if (num === "2") {
        response = await fetch(
          `http://localhost:8000/api/getAvg?chartSource=${selectedSource}&field1=${dim}`
        );
      }

      const res = await response.json();
      const totalSum = res.data[0].totalSum;
      setTotalSum(totalSum);

      const requestData = {
        chartSource: selectedSource,
        chartBasic: identify,
        chartNum: num,
        dashlet: dash,
        layout: layout,
      };
      requestData.chartElements = {
        sumChart: {
          field: dim,
        },
      };
      console.log("generate", requestData);
      await axios.patch("http://localhost:8000/api/saveGraph", requestData);
      setGraph(!graph);
      setNum("");
      setShowModal(false);
    } catch (err) {
      console.error("Error fetching sum:", err);
    }
  };
  const handleGenerateEditCount = async () => {
    setLoading(true);
    try {
      let response;
      if (num === "1") {
        response = await fetch(
          `http://localhost:8000/api/getSum?chartSource=${selectedSource}&field1=${dim}&field2=${measure}`
        );
      } else if (num === "2") {
        response = await fetch(
          `http://localhost:8000/api/getAvg?chartSource=${selectedSource}&field1=${dim}&field2=${measure}`
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const res = await response.json();
      const totalSum = res.data[0].totalSum;
      setTotalSum(totalSum);

      const requestData = {
        chartSource: selectedSource,
        chartBasic: identify,
        chartNum: num,
        dashlet: dash,
        layout: layout,
      };
      requestData.chartElements = {
        sumChart: {
          field: dim,
        },
      };
      await axios.patch(
        `http://localhost:8000/api/updateGraph/${objid}/${id}`,
        requestData
      );

      setId("");
      setShowModal(false);
      setGraph(!graph);
    } catch (error) {
      console.error("Error generating edit count:", error.message);
    }
    setLoading(false);
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/api/deleteGraph/${objid}`, {
        id: id,
      });

      setGraph(!graph);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSourceChange = (value) => {
    setSelectedSource(value);
  };

  const handleDimension = (value) => {
    setDim(value);
  };
  const handleMeasure = (value) => {
    setMeasure(value);
  };

  const selectGraph = (value) => {
    setType(`${value}`);
  };
  const selectIdentify = (value) => {
    setIdentify(`${value}`);
  };
  const selectNumeric = (value) => {
    setNum(`${value}`);
  };

  const handleAddButton = () => {
    setLoading(true);
    setLayout();
    setAddButton(true);
    setShowModal(true);
    setGraphEdit(false);
    setSelectedSource("");
    setDim("");
    setDash("");
    setMeasure("");
    setIdentify("");
    setType("");
    setLegend(false);
    setTotal(false);
    setSelectPercentage("");
    setSlicePercentage("");
    setGoalLine(false);
    setRadioshowValues("");
    setGoalValue();
    setShowValues(false);
    setGoalLabel("");
    setShowLabel(true);
    setyShowLabel(true);
    setxLabel("");
    setyLabel("");
    setshowLineAndMarks("");
    setyshowLineAndMarks("");
    setLoading(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const onLayoutChange = (newLayout) => {
    console.log("isDraggable:", isDraggable);
    setLayout(newLayout);

    if (!isDraggable && graph) {
      saveLayoutToBackend(newLayout);
      console.log("Layout changed:", newLayout);
    }
  };

  const generateLayout = (graphs) => {
    let maxX = -Infinity;
    let maxY = -Infinity;

    graphs.forEach((graph) => {
      if (graph.layout) {
        maxX = Math.max(maxX, graph.layout.x);
        maxY = Math.max(maxY, graph.layout.y);
      }
    });

    return { x: maxX, y: maxY, h: 5.7, w: 4 };
  };
  const handleLayout = (graphs) => {
    return graphs.map((graph, index) => ({
      i: graph.id?.toString() || index.toString(),
      x: graph.layout.x ? graph.layout.x : (index % 3) * 4,
      y: graph.layout.y ? graph.layout.y * 6 : Math.floor(index / 3) * 6,
      w: graph.layout.w ? graph.layout.w : 4,
      h: graph.layout.h ? graph.layout.h : 5.7,
      minW: 4,
      minH: 5.7,
      maxW: 7,
      maxH: 7,
    }));
  };
  const saveLayoutToBackend = async (layout) => {
    try {
      const updatedGraphs = layout.map((item) => ({
        id: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      }));
      const res = await axios.patch(
        `http://localhost:8000/api/updateGraphPositions/${objid}`,
        updatedGraphs
      );
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleDragDrop = () => {
    setIsDraggable((prev) => !prev);
    if (isDraggable) {
      saveLayoutToBackend(layout);
    }
  };
  const handlelegend = (value) => {
    setLegend(value);
  };
  const handleTotal = (value) => {
    setTotal(value);
  };
  const handleSelectPercentage = (value) => {
    setSelectPercentage(value);
  };
  const handleslicePercentage = (value) => {
    console.log("in app setSlice", value);
    setSlicePercentage(value);
  };
  const handlegoalLineToggle = (value) => {
    setGoalLine(value);
  };
  const handleShowLabel = (value) => {
    setShowLabel(value);
  };
  const handleyShowLabel = (value) => {
    setyShowLabel(value);
  };
  const handleChangeLabel = (value) => {
    setxLabel(value);
  };
  const handleyChangeLabel = (value) => {
    setyLabel(value);
  };
  const handleRadioAngle = (value) => {
    setshowLineAndMarks(value);
  };
  const handleyRadioAngle = (value) => {
    setyshowLineAndMarks(value);
  };
  const handlegoalValue = (value) => {
    console.log(value);
    setGoalValue(value);
  };
  const handlegoalLabel = (value) => {
    setGoalLabel(value);
  };
  const handleShowValues = (value) => {
    setShowValues(value);
  };
  const handleshowradio = (value) => {
    setRadioshowValues(value);
  };
  const handleDashlet = (e) => {
    setDash(e.target.value);
  };
  const options = xyz.map((option) => ({ value: option, label: option }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "inital" : "initial",
      color: state.isFocused ? "white" : "initial",
      "&:hover": {
        backgroundColor: state.isFocused ? "inital" : "initial",
        color: state.isFocused ? "white" : "initial",
      },
    }),
    menu: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "red" : "initial",
      color: state.isSelected ? "white" : "initial",
      "&:hover": {
        backgroundColor: state.isFocused ? "lightgrey" : "initial",
        color: state.isSelected ? "white" : "initial",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "initial",
    }),
  };

  return (
    <div className="App">
      {loading && <Loader />}
      <div className="main-box">
        <div className="row">
          <div className="left-div">
            <div>
              <button
                onClick={handleToggleDragDrop}
                className={`reorder-button ${isDraggable ? "active" : ""}`}
              >
                <img
                  src={reorderIcon}
                  alt="Reorder Icon"
                  className={`reorder-icon ${isDraggable ? "icon-active" : ""}`}
                />
                Reorder Dashlet
              </button>
            </div>
            <button className="add-button" onClick={handleAddButton}>
              + ADD GRAPH
            </button>
          </div>
          <div className="right-div">
            <button
              className={`refresh-btn ${refreshToggle ? "active" : ""}`}
              onClick={() =>
                setRefreshToggle((prev) => {
                  return !prev;
                })
              }
            >
              {refresh === 0 ? (
                <img
                  src={refreshIcon}
                  alt="Refresh Icon"
                  className="refresh-icon"
                />
              ) : (
                <div className={refresh === 0 ? "" : "timer"}>
                  <p className="refresh-p">{refresh}</p>
                  <img
                    src={refreshWhite}
                    // alt="Refresh Icon"
                    className="refreshWhite-icon"
                  />
                </div>
              )}
            </button>
            {refreshToggle && (
              <div className="popup">
                <label>Auto Refresh</label>
                <div
                  className={`popup-option ${refresh === 0 ? "active" : ""}`}
                  onClick={() => handleRefreshClick(0)}
                >
                  <img
                    src={refresh === 0 ? { tickRed } : { tick }}
                    className="tick-icon"
                  />
                  Off
                </div>
                <div
                  className={`popup-option ${refresh === 5 ? "active" : ""}`}
                  onClick={() => handleRefreshClick(5)}
                >
                  <img
                    src={refresh === 5 ? { tickRed } : { tick }}
                    className="tick-icon"
                  />
                  5 minutes
                </div>
                <div
                  className={`popup-option ${refresh === 10 ? "active" : ""}`}
                  onClick={() => handleRefreshClick(10)}
                >
                  <img
                    src={refresh === 10 ? { tickRed } : { tick }}
                    className="tick-icon"
                  />
                  10 minutes
                </div>
                <div
                  className={`popup-option ${refresh === 15 ? "active" : ""}`}
                  onClick={() => handleRefreshClick(15)}
                >
                  <img
                    src={refresh === 15 ? { tickRed } : { tick }}
                    className="tick-icon"
                  />
                  15 minutes
                </div>
              </div>
            )}

            <div className="custom">
              <p>Custom Dashboard</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {addButton && showModal && (
          <div className="box">
            <div className="modal-container">
              <div className="modal-content">
                <div className="dash-name">
                  <div>
                    <label className="select-heading">New Dashlet</label>
                  </div>

                  <div className="buttons-right">
                    <div className="modal-button-container">
                      <button className="cancel" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button
                        className="generate-button"
                        onClick={
                          identify === "1"
                            ? graphEdit
                              ? handleGenerateEditGraph
                              : handleGenerateGraphClick
                            : graphEdit
                            ? handleGenerateEditCount
                            : handleGenerateCount
                        }
                      >
                        {graphEdit ? "Edit" : "Create"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="select-container">
                  <div className="label-container">
                    <img
                      src={dashlet}
                      alt="Source Icon"
                      className="source-icon"
                    />

                    <label className="select-heading">Dashlet Name</label>
                    <div>
                      <input
                        style={{
                          width: "100%",
                          height: "35px",
                          padding: "3px",
                        }}
                        placeholder="Enter Dashlet Title"
                        value={dash}
                        onChange={handleDashlet}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="select-container">
                  <div className="label-container">
                    <img
                      src={sourceIcon}
                      alt="Source Icon"
                      className="source-icon"
                    />
                    <label htmlFor="ddlOptions1" className="select-heading">
                      Select Source
                    </label>
                  </div>
                  <div className="options-container">
                    {sources.map((option, index) => {
                      let icon;
                      if (option.name === "customers") {
                        icon = customer;
                      } else if (option.name === "invoices") {
                        icon = invoiceBlack;
                      } else {
                        icon = ticket;
                      }

                      return (
                        <button
                          key={index}
                          className={`option-button ${
                            option.name === selectedSource ? "selected" : ""
                          }`}
                          onClick={() => handleSourceChange(option.name)}
                          style={{ marginRight: "10px" }}
                        >
                          <img
                            src={icon}
                            alt={`${option.name} Icon`}
                            className={`main-source-icon ${
                              option.name === selectedSource ? "selected" : ""
                            }`}
                          />
                          {option.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="select-container">
                  <div className="label-container">
                    <img
                      src={sourceIcon}
                      alt="Source Icon"
                      className="source-icon"
                    />
                    <label htmlFor="ddlOptions3" className="select-heading">
                      Select Types
                    </label>
                  </div>
                  <div className="options-container">
                    {basic.map((option, index) => {
                      let icon;
                      if (option.name === "Graph") {
                        icon = customer;
                      } else if (option.name === "Numeric") {
                        icon = numericBlack;
                      } else {
                        icon = sourceIcon;
                      }

                      return (
                        <button
                          key={index}
                          className={`option-button ${
                            option.identificationId === Number(identify)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectIdentify(option.identificationId)
                          }
                          style={{ marginRight: "10px" }}
                        >
                          <img
                            src={icon}
                            alt={`${option.name} Icon`}
                            className={`main-source-icon ${
                              option.identificationId === Number(identify)
                                ? "selected"
                                : ""
                            }`}
                          />

                          {option.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {identify === "1" && (
                  <div className="select-container">
                    <div className="label-container">
                      <img
                        src={graphIcon}
                        alt="Source Icon"
                        className="source-icon"
                      />
                      <label htmlFor="ddlOptions2" className="select-heading">
                        Select Visual
                      </label>
                    </div>
                    <div className="options-container">
                      {structures.map((option, index) => {
                        let icon;
                        console.log(option.id);
                        if (option.id === 1) {
                          icon = pieBlack;
                        } else if (option.id === 2) {
                          icon = bar;
                        } else {
                          icon = lineBlack;
                        }

                        return (
                          <button
                            key={index}
                            className={`option-button ${
                              option.id === Number(type) ? "selected" : ""
                            }`}
                            onClick={() => selectGraph(option.id)}
                            style={{ marginRight: "10px" }}
                          >
                            <img
                              src={icon}
                              alt={`${option.name} Icon`}
                              className={`main-source-icon ${
                                option.id === Number(type) ? "selected" : ""
                              }`}
                            />
                            {option.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {identify === "2" && (
                  <div className="select-container">
                    <div className="label-container">
                      <img
                        src={graphIcon}
                        alt="Source Icon"
                        className="source-icon"
                      />
                      <label htmlFor="ddlOptions2" className="select-heading">
                        Select Visual
                      </label>
                    </div>
                    <div className="options-container">
                      {abc.map((option, index) => {
                        let icon;
                        if (option.idc === 1) {
                          icon = sum;
                        } else if (option.idc === 2) {
                          icon = avg;
                        } else {
                          icon = lineBlack;
                        }

                        return (
                          <button
                            key={index}
                            className={`option-button ${
                              option.idc === Number(num) ? "selected" : ""
                            }`}
                            onClick={() => selectNumeric(option.idc)}
                            style={{ marginRight: "10px" }}
                          >
                            <img
                              src={icon}
                              alt={`${option.name} Icon`}
                              className={`main-source-icon ${
                                option.idc === Number(num) ? "selected" : ""
                              }`}
                            />
                            {option.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  {["customers", "ticket", "invoices"].map(
                    (source, index) =>
                      selectedSource === source &&
                      identify === "1" && (
                        <DataDisplayComponent
                          key={index}
                          type={type}
                          handleDimension={handleDimension}
                          handleMeasure={handleMeasure}
                          setDimen={dim}
                          setMea={measure}
                          selectedSource={selectedSource}
                          handlelegend={handlelegend}
                          legendedit={legend}
                          handleTotal={handleTotal}
                          setTot={total}
                          setDim={dim}
                          handleSelectPercentage={handleSelectPercentage}
                          selectPercentage={selectPercentage}
                          handleslicePercentage={handleslicePercentage}
                          setSlice={slicePercentage}
                          handlegoalLineToggle={handlegoalLineToggle}
                          setGoal={goalLine}
                          handlegoalValue={handlegoalValue}
                          setgoalValue={goalValue}
                          handlegoalLabel={handlegoalLabel}
                          setGoalLabel={goalLabel}
                          handleShowValues={handleShowValues}
                          setshowvalues={showValues}
                          handleshowradio={handleshowradio}
                          setradioshow={valueToShow}
                          handleShowLabel={handleShowLabel}
                          xAxisShowLabel={showLabel}
                          handleyShowLabel={handleyShowLabel}
                          yAxisShowLabel={yShowLabel}
                          xAxisLabel={xlabel}
                          handleChangeLabel={handleChangeLabel}
                          yAxisLabel={yLabel}
                          handleyChangeLabel={handleyChangeLabel}
                          setxradioshow={showLineAndMarks}
                          handleRadioAngle={handleRadioAngle}
                          setyradioshow={yshowLineAndMarks}
                          handleyRadioAngle={handleyRadioAngle}
                        />
                      )
                  )}

                  {["customers", "ticket", "invoices"].map((source, index) => {
                    if (selectedSource === source && identify === "2") {
                      return (
                        <Select
                          styles={customStyles}
                          options={options}
                          value={{
                            label: dim === "" ? "Select a Field" : dim,
                            value: dim === "" ? null : dim,
                          }}
                          onChange={(e) => setDim(e.value)}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ResponsiveReactGridLayout
        rowHeight={60}
        width={1200}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={handleLayout(displayGraph)}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType="vertical"
        isDroppable={true}
        // droppingItem={{ i: "xx", h: 50, w: 250 }}
        isResizable={isDraggable}
        isDraggable={isDraggable}
        breakpoints={{ lg: 100 }}
      >
        <div
          key="static-item"
          className="add-card"
          data-grid={{ x: 0, y: 0, w: 4, h: 5.7 }}
        >
          <div className="black-strip">
            <span className="add-black">
              <img src={numeric} alt="Pie Chart Icon" className="source-icon" />
              New Dashlet
            </span>
          </div>
          <div className="add-btn-container">
            <a className="add-btn" onClick={handleAddButton}>
              <img src={addIcon} className="add-icon" />
            </a>
          </div>
          <div className="p">Track Stats Important To Your Business</div>
        </div>
        {layout &&
          displayGraph.map((d, index) => (
            <div
              key={d._id}
              className="chart-card"
              data-grid={handleLayout(displayGraph)[index]}
              onClick={(e) => e.stopPropagation()}
            >
              <ChartCard
                key={d._id}
                d={{ ...d, index }}
                layout={layout}
                displayGraph={displayGraph}
                handleLayout={handleLayout}
                handleEdit={handleEdit}
                handleEditCount={handleEditCount}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
