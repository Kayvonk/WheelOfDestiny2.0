import { useState } from "react";
import "./style.css";

const Wheel = () => {
  const numbersArray = ["Kayvon Kazemini", "Roger Rabbit"
   
  ];

  const [spinAngle, setSpinAngle] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpin = () => {
    const spinDegree = Math.floor(Math.random() * (1800 - 360 + 1)) + 360; // Random spin angle between 360 and 1800 degrees
    const newSpinAngle = spinAngle + spinDegree;
    setSpinAngle(newSpinAngle);

    // Calculate the resulting segment after spin completes
    setTimeout(() => {
      const segmentDegree = 360 / numbersArray.length;
      const normalizedAngle = newSpinAngle % 360;
      const index = Math.floor((360 - normalizedAngle) / segmentDegree) % numbersArray.length;

      setResult(numbersArray[index]);
    }, 2000); // Duration of the spin animation
  };

  return (
    <section className="wheelSection">
      <div className="wheelContainer">
        <div className="pointer"></div>
        <div
          className="wheel"
          style={{
            transform: `rotate(${spinAngle}deg)`,
            transition: "transform 2s ease-out",
          }}
        >
          {numbersArray.map((number, index) => {
            const angle = 360 / numbersArray.length;
            const rotation = angle * index;
            const skew = angle * -8.5;

            return (
              <div
                className="segmentContainer"
                key={index}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div
                  className="segment"
                  style={{
                    transform: `skewY(${skew}deg)`,
                  }}
                ></div>
                <div className="number">{number}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spinBtn" onClick={handleSpin}>
        Spin
      </button>
      {result !== null && <div className="result">Result: {result}</div>}
    </section>
  );
};

export default Wheel;
