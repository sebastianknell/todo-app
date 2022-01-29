import { useState, useRef, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import TodoContext from "../../store/todo-context";
import Card from "../UI/Card";
import Checkbox from "./Checkbox";
import "./TodoCard.css";

function TodoCard(props) {
const todoContext = useContext(TodoContext);
  const handleCompleted = () => {
    todoContext.updateTodo(props.todo.id, {
      ...props.todo,
      completed: !props.todo.completed,
    });
  };

  const [todoDeadline, setTodoDeadline] = useState(
    props.todo.deadline || new Date()
  );
  const deadlineChangeHandler = (event) => {
    console.log(event.target.value);
    setTodoDeadline(new Date(event.target.value));
  };

  const titleRef = useRef();
  // titleRef.current.focus();

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
            completed={props.todo.completed}
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
                // fix time zone bug
                value={todoDeadline.toLocaleDateString("en-CA")}
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