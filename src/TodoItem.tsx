import React, { useState } from 'react';
import styles from "./Todo.module.scss";

type ItemProps = {
  item: string;
  onRemove: () => void;
};

export default function TodoItem(props: ItemProps) {
  const [count, setCount] = useState(0);

  const onComplete = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.todoItem}>
      <button onClick={onComplete}> Complete </button>
      {/* Step 1b */}
      <button onClick={props.onRemove}> Remove </button>
      <span className={styles.label}> {props.item} </span>
      <span className={styles.count}> {count} </span>
    </div>
  );
}