import React from "react";

const DisplayBarMode = ({
  handleGoalLineToggle,
  setGoal,
  handleGoalValue,
  setgoalValue,
  handleGoalLabel,
  setGoalLabel,
  handleshowValues,
  setshowvalues,
  handleRadioShowValues,
  setradioshow,
}) => {
  console.log("in dataBar", setradioshow);
  const displayOptions = ["Some", "All"];
  return (
    <div className="display-section">
      <div className="legend">
        <label className="label">Target Line</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={setGoal}
            onChange={(e) => handleGoalLineToggle(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {setGoal && (
        <>
          <div>
            <div>
              <label>Target Value</label>
            </div>
            <div>
              <input
                type="number"
                placeholder="Enter Target Value"
                value={setgoalValue}
                onChange={(e) => handleGoalValue(e.target.value)}
              />
            </div>
          </div>
          {/* <div>
            <div>
              <label>Goal Label</label>
            </div>
            <div>
              <input
                type="text"
                value={setGoalLabel}
                onChange={(e) => handleGoalLabel(e.target.value)}
              />
            </div>
          </div> */}
        </>
      )}

      <div className="legend">
        <label className="label">Show Values on Data Points</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={setshowvalues}
            onChange={(e) => handleshowValues(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {setshowvalues && (
        <>
          <div>
            <div>
              <label>Value to Show</label>
            </div>
            <div>
              {displayOptions.map((option, index) => (
                <label
                  key={index}
                  className={`radio-label ${
                    setradioshow === option ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="displayOption"
                    value={option}
                    checked={setradioshow === option}
                    onChange={(e) => handleRadioShowValues(e.target.value)}
                    className="radio-input"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayBarMode;
