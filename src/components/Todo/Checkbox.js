import { useState } from "react";

function Checkbox(props) {
  const [completed, setCompleted] = useState(false);
  // Use style with state
  let style = {
    height: "8px",
    width: "8px",
    border: "1px gray solid",
    borderRadius: "25%",
  };
  const handleClick = () => {
    console.log("click");
    setCompleted((prevState) => {
      if (prevState === false) {
        return true;
      }
      return false;
    });
  };

  return (
    <div
      style={completed ? { ...style, backgroundColor: "#0465f5" } : style}
      onClick={handleClick}
    ></div>
  );
}

export default Checkbox;
