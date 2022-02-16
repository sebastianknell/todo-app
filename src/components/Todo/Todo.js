import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";

import { BsThreeDots } from "react-icons/bs";
import Checkbox from "./Checkbox";
import TodoCard from "./TodoCard";

import "./Todo.css";

function Todo(props) {
  const dispatch = useDispatch();

  const completedHandler = () => {
    dispatch(todoActions.completeTodo(props.todo.id));
  };

  const clickHandler = () => {
    dispatch(uiActions.setSelectedTodo(props.todo.id));
  }

  const doubleClickHandler = () => {
    dispatch(uiActions.setOpenedTodo(props.todo.id));
  }

  const deleteHandler = () => {
    dispatch(todoActions.removeTodo(props.todo.id));
  };

  if (props.opened) {
    return <TodoCard todo={props.todo} />;
  }

  return (
    <div className={`todo ${props.highlighted && "highlight"}`}>
      <Checkbox completed={props.todo.completed} onClick={completedHandler} />
      <div
        className={`todo-body ${props.todo.completed && "completed"}`}
        onClick={clickHandler}
        onDoubleClick={doubleClickHandler}
      >
        {props.todo.title}
      </div>
      <BsThreeDots className="btn" fontSize="18px" onClick={deleteHandler} />
    </div>
  );
}

export default Todo;
