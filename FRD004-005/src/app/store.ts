import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todoList/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export interface IRootState extends ReturnType<typeof store.getState> {}
export type AppDispatch = typeof store.dispatch;
