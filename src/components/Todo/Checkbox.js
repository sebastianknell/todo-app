import { useState } from "react";

function Checkbox(props) {
  let style = {
    height: "8px",
    width: "8px",
    border: "1px gray solid",
    borderRadius: "25%",
    cursor: "pointer",
  };

  return (
    <div
      style={props.completed ? { ...style, backgroundColor: "#0465f5" } : style}
      onClick={props.onClick}
    ></div>
  );
}

export default Checkbox;
