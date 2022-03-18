import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import useClickOutside from "../../hooks/use-click-outside";

import { uiActions } from "../../store/ui-slice";
import { updateTodo } from "../../store/todo-api";
import { removeTodo } from "../../store/todo-api";
import { isEmpty } from "../../utils/todo-utils";
import { getDate } from "../../utils/date-utils";

import Card from "../UI/Card";
import Checkbox from "./Checkbox";

import "./TodoCard.css";

function TodoCard(props) {
  const dispatch = useDispatch();
  // console.log(props.todo)
  const [completed, setCompleted] = useState(props.todo.completed);
  const [todoDate, setTodoDate] = useState(
    props.todo.date ? getDate(new Date(props.todo.date)) : ""
  );
  const [someday, setSomeday] = useState(props.todo.someday);
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
    setTodoDate(event.target.value);
    setHasChanged(true);
  };

  const somedayChangeHandler = (event) => {
    setSomeday(event.target.checked);
    setTodoDate("");
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

  const closeHandler = useCallback(() => {
    const newTitle = titleRef.current.value === "" ? null : titleRef.current.value;
    const newNotes = notesRef.current.value === "" ? null : notesRef.current.value;
    const shouldUpdate =
      hasChanged ||
      newTitle !== props.todo.title ||
      newNotes !== props.todo.notes;

    const updatedTodo = {
      ...props.todo,
      title: newTitle,
      notes: newNotes,
      date: todoDate === "" ? null : todoDate,
      someday: someday,
      deadline: todoDeadline === "" ? null : todoDeadline,
      completed: completed,
      inbox: todoLocation === "inbox" && !todoDate,
    };

    if (isEmpty(updatedTodo)) {
      dispatch(removeTodo(props.todo.id));
    } else if (shouldUpdate) {
      dispatch(updateTodo(updatedTodo));
    }

    dispatch(uiActions.setOpenedTodo(null));
  }, [
    props.todo,
    completed,
    todoDate,
    someday,
    todoDeadline,
    todoLocation,
    dispatch,
    hasChanged,
  ]);

  const { ref, isComponentVisible } = useClickOutside(true, document.getElementById("view"));

  useEffect(() => {
    if (!isComponentVisible) {
      closeHandler();
    }
  }, [isComponentVisible, closeHandler]);

  return (
    <div ref={ref}>
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
              disabled={someday}
            />
          </div>
          <div>
            <label htmlFor="someday" className="footer-title">
              Someday
            </label>
            <input
              id="someday"
              type="checkbox"
              checked={someday}
              onChange={somedayChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="deadline" className="footer-title">
              Deadline
            </label>
            <input
              id="deadline"
              className="date-input"
              type="date"
              value={todoDeadline}
              onChange={deadlineChangeHandler}
            />
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
    </div>
  );
}

export default TodoCard;
