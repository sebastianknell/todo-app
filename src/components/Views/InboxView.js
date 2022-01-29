import { useState, useContext } from "react";
import TodoContext from "../../store/todo-context";
import Header from "./Header";
import Footer from "./Footer";
import Spacer from "../UI/Spacer";
import Todo from "../Todo/Todo";
import "./InboxView.css";

function InboxView(props) {
  const [selectedTodo, setSelectedTodo] = useState();
  const [openedTodo, setOpenedTodo] = useState();

  const ctx = useContext(TodoContext);

  const updateSelectedTodo = (id) => {
    setSelectedTodo((prevState) => {
      if (openedTodo) setOpenedTodo(null);
      if (prevState === id) return null;
      return id;
    });
  };

  const handleTodoClick = (id) => {
    updateSelectedTodo(id);
  };

  const handleTodoDoubleClick = (id) => {
    setOpenedTodo(id);
  };

  const handleTodoClose = () => {
    setOpenedTodo(null);
  }

  const handleTodoKeyDown = (id, key) => {
    console.log(key);
    const index = ctx.todos.findIndex((item) => item.id === id);
    console.log(index)
    if (key === "ArrowUp" && index > 0) setSelectedTodo(ctx.todos[index - 1].id);
    if (key === "ArrowDown" && index < ctx.todos.length - 1)
      setSelectedTodo(ctx.todos[index + 1].id);
  };

  const handleNewTodo = () => {
    ctx.addTodo({
      id: 3, // TODO use unique id
      completed: false,
      location: "Inbox"
    });
    setOpenedTodo(3); // TODO move to context
  }

  return (
    <div className="inbox-view">
      <Header title="Inbox" />
      <div className="inbox-body">
        {ctx.todos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            highlighted={selectedTodo === item.id ? true : false}
            opened={openedTodo === item.id ? true : false}
            onClick={handleTodoClick}
            onDoubleClick={handleTodoDoubleClick}
            onClose={handleTodoClose}
            onKeyDown={handleTodoKeyDown}
          />
        ))}
      </div>
      <Spacer />
      <Footer onNewTodo={handleNewTodo}/>
    </div>
  );
}

export default InboxView;
