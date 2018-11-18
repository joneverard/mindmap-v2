import React from "react";

const AppStatus = ({saved}) => {
  return (
    <div className={saved ? "app-status app-status-saved" : "app-status app-status-unsaved"}>
      <ul>
        <li>{saved ? "Map Saved" : "Unsaved Changes"}</li>
      </ul>
    </div>
  );
}
export default AppStatus;