import React from "react";

const Notification = ({ message, cssName }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={cssName}>
        {message}
      </div>
    )
}

export default Notification
