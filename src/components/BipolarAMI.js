import React from "react";
import "../App.css";

const BipolarAMI = ({ data, startTop }) => {
  let isPositive = startTop;
  let previousY = startTop ? 0 : 50;

  return (
    <div>
      <div className="signal-container">
        <svg width={data.length * 50} height="50">
          {data.map((bit, index) => {
            let nextLevel = data[index + 1] || "0";
            let pathData = "";
            let started = false;

            let startX = index * 50;
            let startY = previousY;
            let currentX = startX;
            let currentY = startY;

            // path in the right border of the block
            if (index === 0) {
              if (startTop) {
                if (bit === "0") {
                  currentY = startY + 25;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                  started = true;
                } else {
                  currentY = startY + 50;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                  started = true;
                }
              } else {
                if (bit === "0") {
                  currentY = startY - 25;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                  started = true;
                } else {
                  currentY = startY - 50;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                  started = true;
                }
              }
              isPositive = !isPositive;
            }

            // Path in the middle of the block
            if (bit === "0") {
              if (started) {
                currentX = currentX + 50;
                currentY = 25;
                pathData += `L ${currentX} ${currentY}`;
              } else {
                currentX = currentX + 50;
                currentY = 25;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
              }
            } else {
              if (started) {
                if (isPositive) {
                  currentY = 0;
                  currentX = currentX + 50;
                  pathData += `L ${currentX} ${currentY}`;
                } else {
                  currentY = 50;
                  currentX = currentX + 50;
                  pathData += `L ${currentX} ${currentY}`;
                }
              } else {
                if (isPositive) {
                  currentY = 0;
                  currentX = currentX + 50;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                } else {
                  currentY = 50;
                  currentX = currentX + 50;
                  pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;
                }
              }
              isPositive = !isPositive;
            }

            // Path in the left border of the block
            if (index !== data.length - 1) {
              if (bit === "0" && nextLevel === "1") {
                if (isPositive) {
                  currentY = 0;
                  pathData += `L ${currentX} ${currentY}`;
                } else {
                  currentY = 50;
                  pathData += `L ${currentX} ${currentY}`;
                }
              } else if (bit === "1" && nextLevel === "0") {
                currentY = 25;
                pathData += `L ${currentX} ${currentY}`;
              } else if (bit === "1" && nextLevel === "1") {
                if (isPositive) {
                  currentY = 0;
                  pathData += `L ${currentX} ${currentY}`;
                } else {
                  currentY = 50;
                  pathData += `L ${currentX} ${currentY}`;
                }
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

export default BipolarAMI;
