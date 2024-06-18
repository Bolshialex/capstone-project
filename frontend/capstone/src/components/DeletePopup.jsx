import React from "react";

function DeletePopup(props) {
  return props.trigger ? (
    <div className="delete-popup">
      <div className="delete-popup-container">
        <div className="popup-message">
          Are you sure you want to delete this unit?
        </div>
        <div className="btn-container">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePopup;
