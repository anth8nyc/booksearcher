import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 90, clear: "both", paddingTop: 20, textAlign: "center", backgroundColor: "white", marginBottom: "5px"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
