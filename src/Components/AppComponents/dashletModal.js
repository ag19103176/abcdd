import React from "react";
import dashlet from "../../assets/dashlet.png";
import customer from "../../assets/customer.png";
import invoiceBlack from "../../assets/invoiceBlack.png";
import ticket from "../../assets/ticket.png";
import sourceIcon from "../../assets/source.png";
import numericBlack from "../../assets/numericBlack.png";
import pieBlack from "../../assets/pieBlack.png";
import bar from "../../assets/bar.png";
import lineBlack from "../../assets/lineBlack.png";
import sum from "../../assets/sum.png";
import avg from "../../assets/avg.png";
import graphIcon from "../../assets/graph.png";

const ModalComponent = ({
  identify,
  graphEdit,
  handleCancel,
  handleGenerateEditGraph,
  handleGenerateGraphClick,
  handleGenerateEditCount,
  handleGenerateCount,
  dash,
  handleDashlet,
  selectedSource,
  handleSourceChange,
  selectIdentify,
  type,
  num,
  selectGraph,
  selectNumeric,
}) => {
  const structures = [
    { name: "Pie Graph", id: 1 },
    { name: "Bar Graph", id: 2 },
    { name: "Line Graph", id: 3 },
  ];
  const abc = [
    { name: "Sum", idc: 1 },
    { name: "Average", idc: 2 },
  ];
  const handleGenerateButtonClick = () => {
    if (identify === "1") {
      if (graphEdit) {
        handleGenerateEditGraph();
      } else {
        handleGenerateGraphClick();
      }
    } else {
      if (graphEdit) {
        handleGenerateEditCount();
      } else {
        handleGenerateCount();
      }
    }
  };

  const sources = [
    { name: "customers" },
    { name: "invoices" },
    { name: "tickets" },
  ];

  const basic = [
    { name: "Graph", identificationId: 1 },
    { name: "Numeric", identificationId: 2 },
  ];

  return (
    <div>
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
              onClick={handleGenerateButtonClick}
            >
              {graphEdit ? "Edit" : "Create"}
            </button>
          </div>
        </div>
      </div>

      <div className="select-container">
        <div className="label-container">
          <img src={dashlet} alt="Source Icon" className="source-icon" />
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
            />
          </div>
        </div>
      </div>

      <div className="select-container">
        <div className="label-container">
          <img src={sourceIcon} alt="Source Icon" className="source-icon" />
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
          <img src={sourceIcon} alt="Source Icon" className="source-icon" />
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
                  option.identificationId === Number(identify) ? "selected" : ""
                }`}
                onClick={() => selectIdentify(option.identificationId)}
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
            <img src={graphIcon} alt="Source Icon" className="source-icon" />
            <label htmlFor="ddlOptions2" className="select-heading">
              Select Visual
            </label>
          </div>
          <div className="options-container">
            {structures.map((option, index) => {
              let icon;
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
            <img src={graphIcon} alt="Source Icon" className="source-icon" />
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
    </div>
  );
};

export default ModalComponent;
