// Components/Loader.js
import React from "react";
import "./Loader.css"; // You need to create this CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      {setTimeout(() => {}, 4000)}
    </div>
  );
};

export default Loader;
