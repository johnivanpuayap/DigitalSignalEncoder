import React from "react";
import "../App.css";

const NRZL = ({ data, startTop }) => {
  let previousY = startTop ? 0 : 50;

  return (
    <div>
      <div className="signal-container">
        <svg width={data.length * 50} height="50">
          {data.map((bit, index) => {
            let pathData = "";

            let startX = index * 50;
            let startY = previousY;
            let currentX = startX;
            let currentY = startY;

            if (currentY === 0) {
              if (bit === "0") {
                currentY = 50;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                currentX += 50;
                pathData += `L ${currentX} ${currentY}`;
              } else {
                currentX += 50;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
              }
            } else {
              if (bit === "0") {
                currentX += 50;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
              } else {
                currentY = 0;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                currentX += 50;
                pathData += `L ${currentX} ${currentY}`;
              }
            }

            previousY = currentY;

            return (
              <g key={index}>
                <rect
                  x={startX}
                  y={0}
                  width="50"
                  height="50"
                  stroke="gray"
                  strokeWidth="1"
                  fill="none"
                />
                <path d={pathData} stroke="white" strokeWidth="3" fill="none" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default NRZL;
