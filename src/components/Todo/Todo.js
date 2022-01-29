import { useContext } from "react";
import TodoContext from "../../store/todo-context";
import Checkbox from "./Checkbox";
import TodoCard from "./TodoCard";

import "./Todo.css";

function Todo(props) {
  const todoContext = useContext(TodoContext);

  const handleCompleted = () => {
    todoContext.updateTodo(props.todo.id, {...props.todo, completed: !props.todo.completed})
  };

  if (props.opened) {
    return <TodoCard todo={props.todo} onClose={props.onClose}/>;
  }

  return (
    <div
      className={`todo ${props.highlighted && "highlight"}`}
      tabIndex="0"
      onKeyDown={(e) => {
        props.onKeyDown(props.todo.id, e.key);
      }}
    >
      <Checkbox completed={props.todo.completed} onClick={handleCompleted} />
      <div
        className="todo-body"
        onClick={() => {
          props.onClick(props.todo.id);
        }}
        onDoubleClick={() => props.onDoubleClick(props.todo.id)}
      >
        {props.todo.title}
      </div>
    </div>
  );
}

export default Todo;
