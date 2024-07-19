import React from "react";
import "../Graph/toggle.css";
import refreshIcon from "../../assets/refresh.png";
import refreshWhite from "../../assets/refreshWhite.png";
import tickRed from "../../assets/tickRed.png";
import tick from "../../assets/tick.png";

const RefreshCard = ({
  handleRefreshClick,
  refresh,
  refreshToggle,
  setRefreshToggle,
}) => {
  return (
    <div>
      <button
        className={`refresh-btn ${refreshToggle ? "active" : ""}`}
        onClick={() => setRefreshToggle((prev) => !prev)}
      >
        {refresh === 0 ? (
          <img src={refreshIcon} alt="Refresh Icon" className="refresh-icon" />
        ) : (
          <div className={refresh === 0 ? "" : "timer"}>
            <p className="refresh-p">{refresh}</p>
            <img
              src={refreshWhite}
              alt="Refresh White Icon"
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
              src={refresh === 0 ? tickRed : tick}
              className="tick-icon"
              alt="Tick Icon"
            />
            Off
          </div>
          <div
            className={`popup-option ${refresh === 5 ? "active" : ""}`}
            onClick={() => handleRefreshClick(5)}
          >
            <img
              src={refresh === 5 ? tickRed : tick}
              className="tick-icon"
              alt="Tick Icon"
            />
            5 minutes
          </div>
          <div
            className={`popup-option ${refresh === 10 ? "active" : ""}`}
            onClick={() => handleRefreshClick(10)}
          >
            <img
              src={refresh === 10 ? tickRed : tick}
              className="tick-icon"
              alt="Tick Icon"
            />
            10 minutes
          </div>
          <div
            className={`popup-option ${refresh === 15 ? "active" : ""}`}
            onClick={() => handleRefreshClick(15)}
          >
            <img
              src={refresh === 15 ? tickRed : tick}
              className="tick-icon"
              alt="Tick Icon"
            />
            15 minutes
          </div>
        </div>
      )}
    </div>
  );
};

export default RefreshCard;
