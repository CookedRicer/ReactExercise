import { DOMElement, useState } from "react";
import TodoItem from "./TodoItem";
import styles from "./Todo.module.scss";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type Item = {
  index: number;
  item: string;
  count: number;
};
type ListProps = {
  name: string;
  items: Array<Item>;
};

export default function TodoList(props: Readonly<ListProps>) {
  const [count, setCount] = useState(props.items.length);
  const [itemList, setItemList] = useState<Array<Item>>(props.items);
  const [input, setInput] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const addItem = () => {
    if (input === "") {
      return;
    }
    setItemList([...itemList, { item: input, index: count, count: 0 }]);
    setCount(count + 1);
    (document.getElementById("todo-input") as HTMLInputElement).value = "";
  };

  const setText = (value: string) => {
    setInput(value);
  };

  const removeItem = (index: number) => {
    setItemList(itemList.filter((item) => item.index !== index));
  };

  const safeRemoveItem = (item: Item) => {
    (document.getElementById("deleteModel") as any).showModal();
    setDeleteTarget(item);
  };

  const hideModal = () => {
    (document.getElementById("deleteModel") as any).close();
  };

  const completeItem = () => {
    setInput("");
  };
  const countTask = itemList.reduce(
    (acc, cur) => {
      if (cur.count === 0) {
        acc.newTask++;
      } else {
        acc.doneTask++;
      }
      return acc;
    },
    { newTask: 0, doneTask: 0 },
  );

  return (
    <div className="flex flex-col border border-neutral-500 rounded-xl max-w-xl p-10 mx-auto">
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
          onChange={(e) => setText(e.target.value)}
          placeholder="Input task here"
        />
        <button className="btn btn-primary px-5" onClick={() => addItem()}>
          <span className="material-symbols-outlined">add_circle</span>Add
        </button>
      </div>
      {itemList.length > 0 ? (
        <div className="divide-y divide-dashed divide-neutral">
          {itemList.map((item, idx) => (
            <div className="flex items-center" key={item.index + 1}>
              <span className="font-bold text-xs text-primary">{idx + 1}.</span>
              <TodoItem
                item={item.item}
                onRemove={() => removeItem(item.index)}
                onSafeRemove={() => safeRemoveItem(item)}
                count={item.count}
                onComplete={() => {
                  item.count++;
                  completeItem();
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-neutral my-5">
          <span className="material-symbols-outlined">clear_all</span>
          No Task Item
        </div>
      )}
      <div>
        <DeleteConfirmationModal
          text={deleteTarget?.item || ""}
          onDelete={() => {
            removeItem(deleteTarget?.index || 0);
            hideModal();
          }}
        />
      </div>
      <div className="flex justify-end gap-5 mt-5 flex-col sm:flex-row">
        <div className="flex alert border border-neutral-600 w-12/12 sm:w-3/12">
          <span className="material-symbols-outlined">data_alert</span>
          <span>{countTask.newTask}</span>
        </div>
        <div className="flex alert text-success border-success w-12/12 sm:w-3/12">
          <span className="material-symbols-outlined">data_check</span>
          <span>{countTask.doneTask}</span>
        </div>
      </div>
    </div>
  );
}
