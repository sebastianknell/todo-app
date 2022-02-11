import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import Checkbox from "./Checkbox";
import TodoCard from "./TodoCard";

import "./Todo.css";

function Todo(props) {
  const dispatch = useDispatch();

  const handleCompleted = () => {
    dispatch(todoActions.completeTodo(props.todo.id));
  };

  if (props.opened) {
    return <TodoCard todo={props.todo} onClose={props.onClose}/>;
  }

  return (
    <div
      className={`todo ${props.highlighted && "highlight"}`}
      tabIndex="0"
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
