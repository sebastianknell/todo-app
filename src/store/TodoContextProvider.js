import TodoContext from "./todo-context";
import { useState } from "react";

function TodoContextProvider(props) {
  const [todos, setTodos] = useState(props.todos);

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const updateTodo = (id, todo) => {
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index] = todo;
    setTodos(newTodos);
  };

  const removeTodo = (id) => {};

  const todoContext = {
    todos: todos,
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeTodo: removeTodo,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;
