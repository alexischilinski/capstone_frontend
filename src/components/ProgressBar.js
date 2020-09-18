import React, { Component } from "react";

export const ProgressBar = (props) => {
  return (
    <>
      <div className="progress-bar">
        <div
          className="progress-filler"
          style={{ width: `${props.progress}%` }}
        ></div>
      </div>
      <p className="percentage-p">{props.progress}% complete</p>
    </>
  );
};
