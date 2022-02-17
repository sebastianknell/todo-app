import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";

import Card from "../UI/Card";
import Checkbox from "./Checkbox";

import "./TodoCard.css";

const getDate = (date) =>
  date.getUTCFullYear() +
  "-" +
  String((date.getUTCMonth() + 1)).padStart(2, '0') +
  "-" +
  date.getUTCDate();

function TodoCard(props) {
  const [completed, setCompleted] = useState(props.todo.completed)
  const dispatch = useDispatch();

  const handleCompleted = () => {
    setCompleted(prevState => !prevState);
  };

  const [todoDeadline, setTodoDeadline] = useState(
    props.todo.deadline || new Date()
  );
  const deadlineChangeHandler = (event) => {
    setTodoDeadline(event.target.value);
  };

  const [todoLocation, setTodoLocation] = useState(props.todo.location);
  const locationChangeHandler = (event) => {
    setTodoLocation(event.target.value)
  }

  const titleRef = useRef();

  const notesRef = useRef();
  const notesChangeHandler = () => {
    notesRef.current.style.height = "auto";
    notesRef.current.style.height = notesRef.current.scrollHeight + "px";
  };

  const closeHandler = () => {
    const newTitle = titleRef.current.value || "New To-Do";
    const newNotes = notesRef.current.value;
    dispatch(
      todoActions.updateTodo({
        ...props.todo,
        title: newTitle,
        notes: newNotes,
        deadline: todoDeadline,
        completed: completed,
        location: todoLocation
      })
    );
    dispatch(uiActions.setOpenedTodo(null));
  };

  useEffect(() => {
    titleRef.current.focus();
    notesRef.current.style.height = "auto";
    notesRef.current.style.height = notesRef.current.scrollHeight + "px";
  }, []);

  return (
    <>
      {/* TODO try moving to component */}
      {ReactDOM.createPortal(
        <div className="backdrop" onClick={closeHandler} />,
        document.getElementById("overlays")
      )}
      <Card className="todo-card">
        <header className="todo-header">
          <Checkbox
            completed={completed}
            onClick={handleCompleted}
          />
          <div className="todo-title">
            <input
              placeholder="New To-Do"
              defaultValue={props.todo.title}
              ref={titleRef}
            />
          </div>
        </header>
        <main>
          <div className="notes">
            <textarea
              placeholder="Notes"
              defaultValue={props.todo.notes}
              onChange={notesChangeHandler}
              ref={notesRef}
            ></textarea>
          </div>
        </main>
        <footer>
          <div>
            <span className="footer-title">Deadline</span>
            <span>
              <input
                className="date-input"
                type="date"
                min="2022-01-01"
                value={getDate(new Date(todoDeadline))}
                onChange={deadlineChangeHandler}
              />
            </span>
          </div>
          {/* temporary. will change to custom view */}
          <div className="selector">
            <select value={todoLocation} onChange={locationChangeHandler}>
              <option value="inbox">Inbox</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </footer>
      </Card>
    </>
  );
}

export default TodoCard;
