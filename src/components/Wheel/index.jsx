import { useState } from "react";
import "./style.css";

const Wheel = () => {
  const namesArray = [
    "Mario Mario",
    "Luigi Mario",
    "Link Hyrule",
    "Zelda Hyrule",
  ];

const calculateSkewMultiplier = () => {
  let sum = 0;
  
  for (let i = 5; i <= namesArray.length; i++) {
    if (i % 2 === 0) {
      sum -= 0.3;  // Even steps
    } else {
      sum -= 0.2;  // Odd steps
    }
  }
  
  return sum;
}

let skewMultiplier = calculateSkewMultiplier()

const skewArray = [
  0, 0, 0, 0, 0, 
  -0.2, -0.5, -0.7, -1, -1.2, -1.5, 
  -1.7, -2, -2.2, -2.5, -2.7, 
  -3, -3.2, -3.5, -3.7, -4, 
  -4.2, -4.5, -4.7, -5, -5.2, 
  -5.5, -5.7, -6, -6.2, -6.5, 
  -6.7, -7, -7.2, -7.5, -7.7, 
  -8, -8.2, -8.5, -8.7, -9, 
  -9.2, -9.5, -9.7, -10, -10.2, 
  -10.5, -10.7, -11, -11.2, -11.5, 
  -11.7, -12, -12.2, -12.5, -12.7, 
  -13, -13.2, -13.5, -13.7, -14, 
  -14.2, -14.5, -14.7, -15, -15.2, 
  -15.5, -15.7, -16, -16.2, -16.5, 
  -16.7, -17, -17.2, -17.5, -17.7, 
  -18, -18.2, -18.5, -18.7, -19, 
  -19.2, -19.5, -19.7, -20, -20.2, 
  -20.5, -20.7, -21, -21.2, -21.5, 
  -21.7, -22, -22.2, -22.5, -22.7, 
  -23, -23.2, -23.5, -23.7, -24, 
  -24.2, -24.5, -24.7, -25, -25.2, 
  -25.5, -25.7, -26, -26.2, -26.5, 
  -26.7, -27, -27.2, -27.5, -27.7, 
  -28, -28.2, -28.5, -28.7, -29, 
  -29.2, -29.5, -29.7, -30, -30.2, 
  -30.5, -30.7, -31, -31.2, -31.5, 
  -31.7, -32, -32.2, -32.5, -32.7, 
  -33, -33.2, -33.5, -33.7, -34, 
  -34.2, -34.5, -34.7, -35, -35.2, 
  -35.5, -35.7, -36, -36.2, -36.5, 
  -36.7, -37, -37.2, -37.5, -37.7, 
  -38, -38.2, -38.5, -38.7, -39, 
  -39.2, -39.5, -39.7, -40, -40.2, 
  -40.5, -40.7, -41, -41.2, -41.5, 
  -41.7, -42, -42.2, -42.5, -42.7, 
  -43, -43.2, -43.5, -43.7, -44, 
  -44.2, -44.5, -44.7, -45, -45.2, 
  -45.5, -45.7, -46, -46.2, -46.5, 
  -46.7, -47, -47.2, -47.5, -47.7, 
  -48, -48.2, -48.5, -48.7, -49, 
  -49.2, -49.5, -49.7, -50, -50.2, 
  -50.5, -50.7, -51, -51.2, -51.5, 
  -51.7, -52, -52.2, -52.5, -52.7, 
  -53, -53.2, -53.5, -53.7, -54, 
  -54.2, -54.5, -54.7, -55, -55.2
];

  const [spinAngle, setSpinAngle] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpin = () => {
    const spinDegree = Math.floor(Math.random() * (1800 - 360 + 1)) + 360; // Random spin angle between 360 and 1800 degrees
    const newSpinAngle = spinAngle + spinDegree;
    setSpinAngle(newSpinAngle);

    // Calculate the resulting segment after spin completes
    setTimeout(() => {
      const segmentDegree = 360 / namesArray.length;
      const normalizedAngle = newSpinAngle % 360;
      const index =
        Math.floor((360 - normalizedAngle) / segmentDegree) % namesArray.length;

      setResult(namesArray[index]);
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
          {namesArray.map((number, index) => {
            const angle = 360 / namesArray.length;
            const rotation = angle * index;       
            const skew = angle * skewMultiplier;
            // const skew = angle * skewArray[namesArray.length];

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
                <div className="number">
                  {/* <div className="number" style={{ marginLeft: `${margin}px`, transform: `rotate(25deg)` }}> */}
                  {number}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spinBtn" onClick={handleSpin}>
        Spin
      </button>
      <div
        className="result"
        style={{ visibility: result === null ? "hidden" : "visible" }}
      >
        Result: {result}
      </div>{" "}
    </section>
  );
};

export default Wheel;
