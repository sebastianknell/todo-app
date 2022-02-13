import { createSlice } from "@reduxjs/toolkit";

const testTodos = [
  {
    id: 1,
    title: "Buy milk",
    notes: "almond or soy",
    deadline: "2022-01-16",
    completed: false,
    location: "Inbox",
  },
  {
    id: 2,
    title: "Walk the dog",
    notes: "",
    deadline: "2022-01-17",
    completed: false,
    location: "Inbox",
  },
];

export const todoSlice = createSlice({
  name: "todo-slice",
  initialState: {
    todos: testTodos,
  },
  reducers: {
    addTodo(state, action) {
      const todo = action.payload;
      state.todos.push({
        id: todo.id,
        title: todo.title || "",
        notes: todo.notes || "",
        completed: todo.completed || false,
        location: todo.location,
      });
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
      // const index = state.todos.findIndex((item => item.id === id));
      // delete state.todos[index];
      state.todos = state.todos.filter(item => item.id !== id);
    },
  },
});

export const todoActions = todoSlice.actions;
