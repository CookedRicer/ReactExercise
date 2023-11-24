import { useState } from "react";
import TodoItem from "./TodoItem";
import styles from "./Todo.module.scss";

type ListProps = {
  name: string;
  items: Array<string>;
};

export default function TodoList(props: Readonly<ListProps>) {
  const [itemList, setItemList] = useState<Array<string>>(props.items);
  const [input, setInput] = useState<string>("");

  const addItem = () => {
    if (input === "") {
      return;
    }
    setItemList([...itemList, input]);
  };

  const setText = (value: string) => {
    setInput(value);
  };

  const removeItem = (itemToRemove: string) => {
    setItemList(itemList.filter((item) => item !== itemToRemove));
  };

  return (
    <div className={styles.todoList}>
      <h2>Todo List</h2>
      <p>by {props.name}</p>

      <input onChange={(e) => setText(e.target.value)} />
      <button className="" onClick={() => addItem()}>
        Add 
      </button>

      {itemList.length > 0 ? (
        <ol>
          {itemList.map((item, idx) => (
            <li key={idx}>
              <TodoItem item={item} onRemove={() => removeItem(item)} />
            </li>
          ))}
        </ol>
      ) : (
        <h1>No Todo Items</h1>
      )}
    </div>
  );
}