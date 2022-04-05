import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo-slice",
  initialState: {
    todos: [],
  },
  reducers: {
    replaceTodos(state, action) {
      state.todos = action.payload;
    },

    addTodo(state, action) {
      const todo = action.payload;
      state.todos.push(todo);
    },

    addTodos(state, action) {
      const todos = action.payload;
      for (let todo of todos) {
        state.todos.push(todo);
      }
    },

    completeTodo(state, action) {
      const id = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      if (state.todos[index].completed) {
        state.todos[index].completed = false;
        state.todos[index].logged = false;
      } else {
        state.todos[index].completed = true;
      }
    },

    updateTodo(state, action) {
      const todo = action.payload;
      const index = state.todos.findIndex((item) => item.id === todo.id);
      state.todos[index] = todo;
    },

    logTodos(state, action) {
      state.todos.forEach((item, index, arr) => {
        if (item.completed && !item.logged) {
          arr[index] = {
            ...item,
            logged: true,
          };
        }
      });
    },

    removeTodo(state, action) {
      const id = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos[index].trash = !state.todos[index].trash;
    },
  },
});

export const todoActions = todoSlice.actions;
