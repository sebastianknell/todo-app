import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../store/todo-api";
import { removeTodo } from "../../store/todo-api";
// import { todoActions } from "../../store/todo-slice";
import { uiActions } from "../../store/ui-slice";
import { isEmpty } from "../../utils/todo-utils";
import { getDate } from "../../utils/date-utils";

import Card from "../UI/Card";
import Checkbox from "./Checkbox";

import "./TodoCard.css";

function TodoCard(props) {
  const dispatch = useDispatch();

  const [completed, setCompleted] = useState(props.todo.completed);
  const [todoDate, setTodoDate] = useState(
    props.todo.date ? getDate(new Date(props.todo.date)) : ""
  );
  const [todoDeadline, setTodoDeadline] = useState(
    props.todo.deadline ? getDate(new Date(props.todo.deadline)) : ""
  );
  const [todoLocation, setTodoLocation] = useState(
    props.todo.inbox
      ? "inbox"
      : props.todo.projectId
      ? props.todo.projectId
      : "no-project"
  );
  const [hasChanged, setHasChanged] = useState(false);

  const titleRef = useRef();

  const notesRef = useRef();
  const notesChangeHandler = () => {
    notesRef.current.style.height = "auto";
    notesRef.current.style.height = notesRef.current.scrollHeight + "px";
  };

  useEffect(() => {
    titleRef.current.focus();
    notesRef.current.style.height = "auto";
    notesRef.current.style.height = notesRef.current.scrollHeight + "px";
  }, []);

  const handleCompleted = () => {
    setCompleted((prevState) => !prevState);
    setHasChanged(true);
  };

  const dateChangeHandler = (event) => {
    console.log(event.target.value);
    setTodoDate(event.target.value);
    setHasChanged(true);
  };

  const deadlineChangeHandler = (event) => {
    setTodoDeadline(event.target.value);
    setHasChanged(true);
  };

  const locationChangeHandler = (event) => {
    setTodoLocation(event.target.value);
    if (event.target.value === "inbox") setTodoDate("");
    setHasChanged(true);
  };

  const closeHandler = () => {
    const newTitle = titleRef.current.value;
    const newNotes = notesRef.current.value;
    const shouldUpdate =
      hasChanged ||
      newTitle !== props.todo.title ||
      newNotes !== props.todo.notes;

    const updatedTodo = {
      ...props.todo,
      title: newTitle === "" ? null : newTitle,
      notes: newNotes === "" ? null : newNotes,
      date: todoDate === "" ? null : todoDate,
      deadline: todoDeadline === "" ? null : todoDeadline,
      completed: completed,
      inbox: todoLocation === "inbox" && !todoDate,
    };

    if (isEmpty(updatedTodo)) {
      dispatch(removeTodo(props.todo.id));
    }
    else if (shouldUpdate) {
      dispatch(updateTodo(updatedTodo));
    } 
  
    dispatch(uiActions.setOpenedTodo(null));
  };

  return (
    <>
      {/* TODO try moving to component */}
      {/* TODO try this instead https://stackoverflow.com/a/45323523 */}
      {ReactDOM.createPortal(
        <div className="backdrop" onClick={closeHandler} />,
        document.getElementById("overlays")
      )}
      <Card className="todo-card">
        <header className="todo-header">
          <Checkbox completed={completed} onClick={handleCompleted} />
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
            <label htmlFor="date" className="footer-title">
              Date
            </label>
            <input
              id="date"
              className="date-input"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={todoDate}
              onChange={dateChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="deadline" className="footer-title">
              Deadline
            </label>
            <span>
              <input
                id="deadline"
                className="date-input"
                type="date"
                value={todoDeadline}
                onChange={deadlineChangeHandler}
              />
            </span>
          </div>
          {/* temporary. will change to custom view */}
          <div className="selector">
            <select value={todoLocation} onChange={locationChangeHandler}>
              <option value="inbox">Inbox</option>
              <option value="no-project">No Project</option>
            </select>
          </div>
        </footer>
      </Card>
    </>
  );
}

export default TodoCard;
