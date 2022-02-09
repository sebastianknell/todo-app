import { useState, useRef, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import TodoContext from "../../store/todo-context";
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
  const todoContext = useContext(TodoContext);
  const [completed, setCompleted] = useState(props.todo.completed)
  const handleCompleted = () => {
    setCompleted((prevState) => !prevState)
  };

  const [todoDeadline, setTodoDeadline] = useState(
    props.todo.deadline || new Date()
  );
  const deadlineChangeHandler = (event) => {
    setTodoDeadline(new Date(event.target.value));
  };

  const titleRef = useRef();

  const notesRef = useRef();
  const notesChangeHandler = () => {
    notesRef.current.style.height = "auto";
    notesRef.current.style.height = notesRef.current.scrollHeight + "px";
  };

  const closeHandler = () => {
    const newTitle = titleRef.current.value || "New To-Do";
    const newNotes = notesRef.current.value;
    todoContext.updateTodo(props.todo.id, {
      ...props.todo,
      title: newTitle,
      notes: newNotes,
      completed: completed
    });
    props.onClose();
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <>
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
              ref={notesRef}
              onChange={notesChangeHandler}
              defaultValue={props.todo.notes}
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
                value={getDate(todoDeadline)}
                onChange={deadlineChangeHandler}
              />
            </span>
          </div>
        </footer>
      </Card>
    </>
  );
}

export default TodoCard;
