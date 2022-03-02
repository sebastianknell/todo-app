import { createSlice } from "@reduxjs/toolkit";

const testAreas = [
  {
    id: 1,
    name: "Home",
    projects: [],
  },
  {
    id: 2,
    name: "Work",
    projects: [
      {
        id: 1,
        name: "To-Do app",
        notes: "",
        date: "",
        deadline: "",
      },
    ],
  },
];

export const todoSlice = createSlice({
  name: "todo-slice",
  initialState: {
    todos: [],
    areas: testAreas,
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
        state.todos.push(todo)
      }
    },

    completeTodo(state, action) {
      const id = action.payload;
      const index = state.todos.findIndex((item) => item.id === id);
      state.todos[index].completed = !state.todos[index].completed;
    },

    updateTodo(state, action) {
      const todo = action.payload;
      const index = state.todos.findIndex((item) => item.id === todo.id);
      state.todos[index] = todo;
    },

    removeTodo(state, action) {
      const id = action.payload;
      state.todos = state.todos.filter((item) => item.id !== id);
    },
  },
});

export const todoActions = todoSlice.actions;
