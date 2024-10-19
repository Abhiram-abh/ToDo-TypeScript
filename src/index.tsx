import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./Pages/HomePage/index"; // Adjust path based on your structure
import "./Style/index.css"; // Your global CSS

ReactDOM.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
  document.getElementById("root")
);
