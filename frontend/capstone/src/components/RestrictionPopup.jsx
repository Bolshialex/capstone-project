import React from "react";

function RestrictionPopup(props) {
  return props.trigger ? (
    <div className="restriction-popup">
      <div className="restriction-popup-container">
        <div className="popup-message">
          Restricted Page. Please Contact Admin.
          <br />
          If you were recently updated, please try logging back in.
        </div>
        <div className="restriction-btn-container">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default RestrictionPopup;
