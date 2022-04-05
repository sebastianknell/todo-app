import { useEffect, useState } from "react";

function TitleInput({ name, placeholder }) {
  const [areaName, setAreaName] = useState("");
  const [areaNameWidth, setAreaNameWidth] = useState(0);

  // TODO fix ch bug or find better solution
  useEffect(() => {
    setAreaName(name);
    setAreaNameWidth(name.length + 0.5 + "ch");
  }, [name]);

  const areaInputChangeHandler = (event) => {
    setAreaName(event.target.value);
    if (event.target.value.length === 0)
      setAreaNameWidth(placeholder.length + 0.5 + "ch");
    else setAreaNameWidth(event.target.value.length + 0.5 + "ch");
  };

  return (
    <input
      style={{ width: areaNameWidth }}
      className="view-title"
      placeholder={placeholder}
      value={areaName}
      onChange={areaInputChangeHandler}
    />
  );
}

export default TitleInput;
