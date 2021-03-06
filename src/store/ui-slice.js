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
      state.selectedTodo = id;
      if (state.openedTodo) state.openedTodo = null;
    },
    setOpenedTodo(state, action) {
      const id = action.payload;
      state.openedTodo = id;
    },
  },
});

export const uiActions = uiSlice.actions;