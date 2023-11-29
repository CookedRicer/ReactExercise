import React, { useState } from "react";

type ItemProps = {
  item: string;
  count: number;
  onRemove: () => void;
  onSafeRemove: () => void;
  onComplete: () => void;
};

export default function TodoItem(props: ItemProps) {
  const [count, setCount] = useState(props.count);

  return (
    <div className="flex justify-between items-center p-3 w-full">
      <div className="flex items-center gap-2">
        <span className=""> {props.item} </span>
        <span
          className={
            count === 0
              ? "countdown badge badge-neutral"
              : "countdown badge badge-success"
          }
        >
          <span
            style={{ "--value": count.toString() } as React.CSSProperties}
          ></span>
        </span>
      </div>
      <div className="flex items-center">
        <button
          className="btn btn-square btn-sm btn-success me-2"
          onClick={() => {
            setCount(count + 1);
            props.onComplete();
          }}
        >
          <span className="material-symbols-outlined">done</span>
        </button>
        <button
          className="btn btn-square btn-sm btn-neutral btn-outline me-2"
          onClick={() => props.onRemove()}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <button
          className="btn btn-square btn-sm btn-neutral btn-outline"
          onClick={() => props.onSafeRemove()}
        >
          <span className="material-symbols-outlined">Delete</span>
        </button>
      </div>
    </div>
  );
}
