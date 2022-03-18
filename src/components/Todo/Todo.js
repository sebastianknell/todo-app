import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { completeTodo } from "../../store/todo-api";
import { removeTodo } from "../../store/todo-api";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";

import { BsThreeDots } from "react-icons/bs";
import Checkbox from "./Checkbox";
import TodoCard from "./TodoCard";

import "./Todo.css";

function Todo(props) {
  const ref = useRef()
  const dispatch = useDispatch();
  const { selectedTodo, openedTodo } = useSelector((state) => state.ui);
  const highlighted = selectedTodo === props.todo.id;

  const completedHandler = () => {
    dispatch(completeTodo(props.todo.id, !props.todo.completed));
  };

  const clickHandler = () => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(uiActions.setSelectedTodo(null));
      }
    };
    if (selectedTodo === props.todo.id) {
      dispatch(uiActions.setSelectedTodo(null))
      document.removeEventListener("click", handleClickOutside, true);
    } else {
      dispatch(uiActions.setSelectedTodo(props.todo.id));
      document.addEventListener("click", handleClickOutside, true);
    }
  };

  const doubleClickHandler = () => {
    dispatch(uiActions.setOpenedTodo(props.todo.id));
  };

  const deleteHandler = () => {
    dispatch(removeTodo(props.todo.id));
  };

  if (openedTodo === props.todo.id) {
    return <TodoCard todo={props.todo} />;
  }

  return (
    <div className={`todo ${highlighted ? "highlight" : ""}`} ref={ref}>
      <Checkbox completed={props.todo.completed} onClick={completedHandler} />
      <div
        className={`todo-body ${props.todo.completed ? "completed" : ""}`}
        onClick={clickHandler}
        onDoubleClick={doubleClickHandler}
      >
        {props.todo.title}
      </div>
      <BsThreeDots className="btn no-shrink" fontSize="18px" onClick={deleteHandler} />
    </div>
  );
}

export default Todo;
