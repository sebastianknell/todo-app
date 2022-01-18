// import { useState } from "react";
import Checkbox from "./Checkbox";

import "./Todo.css";

function Todo(props) {
  const handleClick = () => {
    props.onClick(props.todo.id);
  };

  return (
    <div className={`todo ${props.highlighted && "highlight"}`}>
      <Checkbox />
      <div className="todo-body" onClick={handleClick}>
        {props.todo.title}
      </div>
    </div>
  );
}

export default Todo;
