import React from "react";

interface DeleteConfirmationModalProps {
  text: string;
  onDelete: () => void;
}

export default function DeleteConfirmationModal(
  props: DeleteConfirmationModalProps,
) {
  return (
    <dialog id="deleteModel" className="modal">
      <div className="modal-box border border-error">
        <h3 className="font-bold text-xl flex items-center">
          <span className="material-symbols-outlined me-3">error</span>Delete
          Task
        </h3>
        <p className="py-4">Are you sure to delete the following task?</p>
        <div className="alert alert-error">
          <span className="material-symbols-outlined">data_info_alert</span>
          {props.text}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-neutral">Cancel</button>
          </form>
          <button className="btn btn-error" onClick={props.onDelete}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
