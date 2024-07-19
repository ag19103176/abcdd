import React from "react";
import "./dataMode.css";
import Select from "react-select";

const DataMode = ({
  dimensions,
  measures,
  setDimen,
  setMea,
  handleDimensionChange,
  handleMeasureChange,
  type,
}) => {
  const options = dimensions.map((option) => ({
    value: option,
    label: option,
  }));
  const optionMeas = measures.map((option) => ({
    value: option,
    label: option,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "140%",
      maxWidth: "300px",
      margin: "2%",
      backgroundColor: state.isFocused ? "inital" : "initial",
      color: state.isFocused ? "white" : "initial",
      "&:hover": {
        backgroundColor: state.isFocused ? "inital" : "initial",
        color: state.isFocused ? "white" : "initial",
      },
    }),
    menu: (provided) => ({
      ...provided,
      width: "140%",
      maxWidth: "300px",
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
    <div className="dim-container">
      <div>
        <label>{type === "1" ? "Dimension" : "X-axis"}</label>
        <Select
          styles={customStyles}
          options={options}
          value={{
            label: setDimen === "" ? "Select a Field" : setDimen,
            value: setDimen === "" ? null : setDimen,
          }}
          onChange={(e) => handleDimensionChange(e.value)}
          placeholder="Select Field"
        />
      </div>

      <div>
        <label>{type === "1" ? "Measure" : "Y-axis"}</label>

        <Select
          styles={customStyles}
          options={optionMeas}
          value={{
            label: setMea === "" ? "Select a Field" : setMea,
            value: setMea === "" ? null : setMea,
          }}
          onChange={(e) => handleMeasureChange(e.value)}
        />
      </div>
    </div>
  );
};

export default DataMode;
