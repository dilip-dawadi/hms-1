import React from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        background: "#0006",
        color: "gray",
        top: 0,
        left: 0,
        zIndex: 50,
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
    >
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          stroke="#fff"
          strokeWidth="1/"
          fill="none"
          points="20,30 0, 0 40, 50"
        />
        <polygon
          stroke="#fff"
          strokeWidth="1/"
          fill="none"
          points="20,30 40, 0 0, 50"
        />
        <text fill="#fff" x="0" y="28.5">
          RhinospotnKalij
        </text>
      </svg>
    </div>
  );
};
export default Loading;
