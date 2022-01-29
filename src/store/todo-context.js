import React from "react";

const TodoContext = React.createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  removeTodo: (id) => {}
});

export default TodoContext;
