import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "./TodoList";

export interface TodoState {
  todoItems: Array<Item>;
}

export type RecordAction = "Create" | "Delete" | "Edit" | "Complete";
export interface Record {
  action: RecordAction;
  item: Item;
  updated_at: Date;
}

const mapRecord = (action: RecordAction, item: Item) => {
  return {
    action,
    item,
    updated_at: new Date(Date.now()),
  };
};

const loadTodoItem = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList") as string)
  : ([] as Item[]);

const storeRecord = (newRecord: Record) => {
  const records = localStorage.getItem("todoRecord")
    ? JSON.parse(localStorage.getItem("todoRecord") as string)
    : ([] as Record[]);
  localStorage.setItem("todoRecord", JSON.stringify([...records, newRecord]));
};

const initialState: TodoState = {
  todoItems: loadTodoItem,
};

type UpdateTodo = {
  index: number;
  item: string;
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoItem: (state: TodoState, action: PayloadAction<Item>) => {
      state.todoItems.push(action.payload);
      storeRecord(mapRecord("Create", action.payload));
    },
    deleteTodoItem: (state: TodoState, action: PayloadAction<number>) => {
      storeRecord(
        mapRecord(
          "Delete",
          state.todoItems.find((item) => item.index === action.payload) as Item,
        ),
      );
      state.todoItems = state.todoItems.filter(
        (item) => item.index !== action.payload,
      );
    },
    updateTodoItem: (state: TodoState, action: PayloadAction<UpdateTodo>) => {
      storeRecord(
        mapRecord(
          "Edit",
          state.todoItems.find(
            (item) => item.index === action.payload.index,
          ) as Item,
        ),
      );
      state.todoItems.map((item) => {
        if (item.index === action.payload.index) {
          item.item = action.payload.item;
        }
        return item;
      });
    },
    completeTodoItem: (state: TodoState, action: PayloadAction<number>) => {
      storeRecord(
        mapRecord(
          "Complete",
          state.todoItems.find((item) => item.index === action.payload) as Item,
        ),
      );
      state.todoItems.map((item) => {
        if (item.index === action.payload) {
          item.count += 1;
        }
        return item;
      });
    },
  },
});

export const { addTodoItem, deleteTodoItem, updateTodoItem, completeTodoItem } =
  todoSlice.actions;
export default todoSlice.reducer;
