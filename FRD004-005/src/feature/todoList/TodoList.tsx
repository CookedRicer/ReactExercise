import { useEffect, useState } from "react";

import TodoItem from "./TodoItem";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  addTodoItem,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
} from "./TodoSlice";
import EditTaskModal from "./EditTaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hook";

export type Item = {
  index: number;
  item: string;
  count: number;
};
type ListProps = {
  name: string;
  items: Array<Item>;
};

export default function TodoList(props: Readonly<ListProps>) {
  const todoItems = useAppSelector((state) => state.todo.todoItems);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>("");
  const [targetElement, setTargetElement] = useState<Item | null>(null);
  const [editInput, setEditInput] = useState<string>(targetElement?.item || "");

  const addItem = () => {
    if (input === "") {
      return;
    }
    dispatch(addTodoItem({ item: input, index: Date.now(), count: 0 }));
    setInput("");
  };
  const removeItem = (index: number) => {
    dispatch(deleteTodoItem(index));
  };

  const completeTask = (index: number) => {
    dispatch(completeTodoItem(index));
  };

  const updateTask = (index: number, item: string) => {
    dispatch(updateTodoItem({ index, item }));
  };

  const showModal = (item: Item, elementId: string) => {
    (document.getElementById(elementId) as any).showModal();
    setTargetElement(item);
  };

  const hideModal = (elementId: string) => {
    (document.getElementById(elementId) as any).close();
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoItems));
    return () => {};
  }, [todoItems]);

  const countTaskStatus = todoItems.reduce(
    (acc, item) => {
      if (item.count === 0) {
        acc.newTask++;
      } else {
        acc.doneTask++;
      }
      return acc;
    },
    { newTask: 0, doneTask: 0 },
  );

  return (
    <div className="flex flex-col bg-base-100/30 backdrop-blur-md shadow-md rounded-xl max-w-xl p-10 mx-auto border border-primary">
      <div>
        <h2 className="text-5xl font-black flex items-center">
          <span className="text-5xl material-symbols-outlined me-3">lists</span>
          Todo List
        </h2>
        <span className="badge badge-neutral text-sm tracking-wide px-3 mb-5">
          created by {props.name}
        </span>
      </div>
      <div className="flex justify-between align-middle mb-5">
        <input
          id="todo-input"
          type="text"
          className="input input-bordered w-full me-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input task here"
        />
        <button className="btn btn-primary px-5" onClick={() => addItem()}>
          <span className="material-symbols-outlined">add_circle</span>Add
        </button>
      </div>
      {todoItems.length > 0 ? (
        <div className="divide-y divide-dashed divide-neutral">
          {todoItems.map((item, idx) => (
            <div className="flex items-center" key={item.index}>
              <span className="font-bold text-xs text-primary">{idx + 1}.</span>
              <TodoItem
                item={item.item}
                onRemove={() => removeItem(item.index)}
                onSafeRemove={() => showModal(item, "deleteModal")}
                onCompleteTask={() => completeTask(item.index)}
                onUpdateTask={() => showModal(item, "editModal")}
                count={item.count}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert bg-base-200/70 my-5 ">
          <span className="material-symbols-outlined">clear_all</span>
          No Task Item
        </div>
      )}
      <div>
        <DeleteConfirmationModal
          dialogId="deleteModal"
          text={targetElement?.item || ""}
          onDelete={() => {
            removeItem(targetElement?.index || 0);
            hideModal("deleteModal");
          }}
        />
        <EditTaskModal
          dialogId="editModal"
          text={editInput}
          item={targetElement?.item || ""}
          onChange={(e) => setEditInput(e.target.value)}
          onCancel={() => setEditInput("")}
          onEditConfirm={() => {
            if (targetElement === null) return;
            updateTask(targetElement.index, editInput);
            setEditInput("");
            hideModal("editModal");
          }}
        />
      </div>
      <div className="flex justify-end gap-5 mt-5 flex-col sm:flex-row">
        <div className="flex alert bg-transparent border border-neutral-600 w-12/12 sm:w-3/12">
          <span className="material-symbols-outlined">data_alert</span>
          <span>{countTaskStatus.newTask}</span>
        </div>
        <div className="flex alert bg-transparent text-emerald-400 border-emerald-400 w-12/12 sm:w-3/12">
          <span className="material-symbols-outlined">data_check</span>
          <span>{countTaskStatus.doneTask}</span>
        </div>
      </div>
    </div>
  );
}
