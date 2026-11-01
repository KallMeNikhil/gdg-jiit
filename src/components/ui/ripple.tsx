"use client";

import React from "react";
import "./Ripple.css";


export function Ripple() {
  const mainCircleSize = 210;
  const numCircles = 8;

  return (
    <div className="ripple-container">
      {Array.from({ length: numCircles }).map((_, i) => (
        <div
          key={i}
          className="ripple-circle"
          style={{
            width: `${mainCircleSize + i * 100}px`,
            height: `${mainCircleSize + i * 100}px`,
            "--i": i,
            "--duration": "4s",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

Ripple.displayName = "Ripple";