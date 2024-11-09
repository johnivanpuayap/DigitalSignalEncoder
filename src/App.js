import React, { useState } from "react";
import NRZL from "./components/NRZL.js";
import NRZI from "./components/NRZI";
import BipolarAMI from "./components/BipolarAMI";
import Pseudoternary from "./components/Pseudoternary";
import Manchester from "./components/Manchester";
import DifferentialManchester from "./components/DifferentialManchester";
import "./App.css";

function App() {
  const [inputSize, setInputSize] = useState(4);
  const [inputData, setInputData] = useState(generateRandomData(4));
  const [startTop, setStartTop] = useState(true);

  // Function to generate random data
  function generateRandomData(size) {
    return Array.from({ length: size }, () =>
      Math.random() > 0.5 ? "1" : "0"
    );
  }

  // Handle input data size change
  const handleSliderChange = (event) => {
    const size = event.target.value;
    setInputSize(size);

    if (inputData.length < size) {
      setInputData([
        ...inputData,
        ...generateRandomData(inputSize - inputData.length),
      ]);
    } else {
      setInputData(inputData.slice(0, size));
    }
  };

  // Handle randomize button click
  const handleRandomize = () => {
    setInputData(generateRandomData(inputSize));
  };

  const toggleDigit = (index) => {
    setInputData((prevData) => {
      const newData = [...prevData];
      newData[index] = newData[index] === "1" ? "0" : "1"; // Toggle between 1 and 0
      return newData;
    });
  };

  return (
    <div className="container">
      <div className="instruction-text">
        Click the boxes to change the value (0 or 1).
      </div>
      <div className="digital-signal">
        <div className="label">Digital Signal</div>

        <div className="input-data">
          {inputData.map((digit, index) => (
            <div
              key={index}
              onClick={() => toggleDigit(index)}
              className="digit-box"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <label className="input-label">Input Size:</label>
        <input
          id="input-size"
          type="range"
          min="4"
          max="15"
          value={inputSize}
          onChange={handleSliderChange}
          className="slider"
        />
        <button onClick={handleRandomize} className="randomize-btn">
          Randomize
        </button>
        <label className="input-label">
          <input
            type="checkbox"
            checked={startTop}
            onChange={() => setStartTop(!startTop)}
          />
          Start at Top
        </label>
      </div>

      {[
        "NRZL",
        "NRZI",
        "Bipolar AMI",
        "Pseudoternary",
        "Manchester",
        "Differential Manchester",
      ].map((label, index) => (
        <div key={index} className="row">
          <div className="label">{label}</div>
          <div className="component">
            {label === "NRZL" && <NRZL data={inputData} startTop={startTop} />}
            {label === "NRZI" && <NRZI data={inputData} startTop={startTop} />}
            {label === "Bipolar AMI" && (
              <BipolarAMI data={inputData} startTop={startTop} />
            )}
            {label === "Pseudoternary" && (
              <Pseudoternary data={inputData} startTop={startTop} />
            )}
            {label === "Manchester" && (
              <Manchester data={inputData} startTop={startTop} />
            )}
            {label === "Differential Manchester" && (
              <DifferentialManchester data={inputData} startTop={startTop} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
