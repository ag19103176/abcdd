import React, { useState } from "react";
import reorderIcon from "../../assets/reorder.png";
import RefreshCard from "./refresh";

const MainBox = ({
  handleAddButton,
  handleRefreshClick,
  refresh,
  refreshToggle,
  setRefreshToggle,
  handleToggleDragDrop,
  isDraggable,
}) => {
  return (
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
        <RefreshCard
          handleRefreshClick={handleRefreshClick}
          refresh={refresh}
          refreshToggle={refreshToggle}
          setRefreshToggle={setRefreshToggle}
        />
        <div className="custom">
          <p>Custom Dashboard</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MainBox;
