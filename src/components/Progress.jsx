import React from "react";

export default function Progress({ percent }) {
  return (
    <div className="progress-wrap">
      <div className="progress-top">
        <span>Form Completion</span>
        <b id="pct">{percent}%</b>
      </div>
      <div className="bar">
        <i id="barFill" style={{ width: `${percent}%` }}></i>
      </div>
    </div>
  );
}
