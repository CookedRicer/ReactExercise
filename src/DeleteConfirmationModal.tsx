import React from "react";

interface DeleteConfirmationModalProps {
  isShow: boolean;
  text: string;
  onDelete: () => void;
  onHide: () => void;
}

// Step 7
export default function DeleteConfirmationModal(
  props: DeleteConfirmationModalProps
) {
  return (
    <div>
      <div>
        <h5>Delete Item Confirmation</h5>
      </div>

      <div>
        Do you confirm to delete item "
        <span>{props.text}</span>"?
        <br />
        <i>This action cannot be reversed.</i>
      </div>

      <div>
        <button onClick={props.onHide}>
          Cancel
        </button>

        <button onClick={props.onDelete}>
          Confirm Delete
        </button>
      </div>
    </div>
  );
}