import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: 'ui-slice',
  initialState: {
    selectedTodo: null,
    openedTodo: null,
  },
  reducers: {
    setSelectedTodo(state, action) {
      const id = action.payload;
      state.selectedTodo = state.selectedTodo === id ? null : id;
    },
    setOpenedTodo(state, action) {
      const id = action.payload;
      state.openedTodo = id;
    },
  },
});

export const uiActions = uiSlice.actions;