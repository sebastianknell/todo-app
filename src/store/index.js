import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./ui-slice";
import { todoSlice } from "./todo-slice";
import { areaSlice } from "./area-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
    area: areaSlice.reducer,
  },
});

export default store;
