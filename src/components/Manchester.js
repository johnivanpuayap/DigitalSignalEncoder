import React from "react";
import "../App.css";

const Manchester = ({ data, startTop }) => {
  let previousY = startTop ? 0 : 50;

  return (
    <div>
      <div>
        <svg width={data.length * 50} height="50">
          {data.map((bit, index) => {
            let currentLevel = data[index];
            let pathData = "";

            let startX = index * 50;
            let startY = previousY;
            let currentX = startX;
            let currentY = startY;

            // path in the right border of the block
            if (startY === 0) {
              if (currentLevel === "1") {
                currentY = 50;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;

                currentY = 0;
                pathData += `L ${currentX} ${currentY}`;

                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;
              } else {
                currentX = currentX + 25;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                currentY = 50;
                pathData += `L ${currentX} ${currentY}`;

                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;
              }
            } else if (startY === 50) {
              if (currentLevel === "0") {
                currentY = 0;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                // Move to the center
                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;

                currentY = 50;
                pathData += `L ${currentX} ${currentY}`;

                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;
              } else {
                currentX = currentX + 25;
                pathData += `M ${startX} ${startY} L ${currentX} ${currentY}`;

                currentY = 0;
                pathData += `L ${currentX} ${currentY}`;

                currentX = currentX + 25;
                pathData += `L ${currentX} ${currentY}`;
              }
            }

            previousY = currentY;

            return (
              <g key={index}>
                <rect
                  x={startX} // Position the block on the left side
                  y={0}
                  width="50" // Width of the block
                  height="50"
                  stroke="gray"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d={pathData} // Path data we calculated
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Manchester;
