import React from "react";
import "./axes.css";
// import "../Graph/toggle.css";

const Axes = ({
  xAxisShowLabel,
  handleshowlabel,
  yAxisShowLabel,
  handleyshowlabel,
  handleradioangle,
  setxradioshow,
  handleyradioangle,
  setyradioshow,
}) => {
  const angleOptions = ["Hide", "Show"];
  const yangleOptions = ["Hide", "Show"];

  return (
    <div className="axes-container">
      <div className="axis-section">
        <label>X-Axis</label>
        <div className="showLabel">
          <label className="label">Show Label</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={xAxisShowLabel}
              onChange={(e) => handleshowlabel(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <label>Show Lines and Marks</label>

          <div className="radio-container">
            {angleOptions.map((option, index) => (
              <label
                key={index}
                className={`radio-label ${
                  setxradioshow === option ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="angleOption"
                  value={option}
                  checked={setxradioshow === option}
                  onChange={(e) => handleradioangle(e.target.value)}
                  className="radio-input"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="axis-section">
        <label>Y-Axis</label>
        <div className="showLabel">
          <label className="label">Show Label</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={yAxisShowLabel}
              onChange={(e) => handleyshowlabel(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <label>Show Lines and Marks</label>
          <div className="radio-container">
            {yangleOptions.map((xoption, index) => (
              <label
                key={index}
                className={`radio-label ${
                  setyradioshow === xoption ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="yangleOption"
                  value={xoption}
                  checked={setyradioshow === xoption}
                  onChange={(e) => handleyradioangle(e.target.value)}
                  className="radio-input"
                />
                {xoption}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Axes;
