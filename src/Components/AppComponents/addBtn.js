import React from "react";
import "./card.css";
import numeric from "../../assets/numeric.png";
import addIcon from "../../assets/add.png";

const AddButtonComponent = ({ handleAddButton }) => {
  return (
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
          <img src={addIcon} alt="Add Icon" className="add-icon" />
        </a>
      </div>
      <div className="p">Track Stats Important To Your Business</div>
    </div>
  );
};

export default AddButtonComponent;
