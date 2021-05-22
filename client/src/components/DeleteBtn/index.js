import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <button {...props} className="col-1 delete-btn btn" role="button" tabIndex="0">
    
      Delete
    {props.children}
  </button>
  );
}

export default DeleteBtn;
