import React, { useState } from "react";

interface EditModalProps {
  dialogId: string;
  text: string;
  item: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onEditConfirm: () => void;
}

export default function EditTaskModal(props: EditModalProps) {
  return (
    <dialog id={props.dialogId} className="modal">
      <div className="modal-box border border-primary">
        <h3 className="font-bold text-xl flex items-center">
          <span className="material-symbols-outlined me-3">edit_document</span>
          Edit Task
        </h3>
        <p className="py-4">Notes: This action cannot be undone.</p>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder={props.item}
          value={props.text}
          onChange={props.onChange}
        ></input>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-neutral" onClick={props.onCancel}>
              Cancel
            </button>
          </form>
          <button className="btn btn-primary" onClick={props.onEditConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
