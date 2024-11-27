import { useState } from "react";
import "./style.css";

const Wheel = ({
  color1,
  color2,
  color3,
  color5,
  color6,
  color7,
  namesArray,
}) => {
  let bgColor1 = color1;
  let bgColor2 = color2;
  let bgColor3 = color3;
  let textColor1 = color5;
  let textColor2 = color6;
  let textColor3 = color7;

  const initialArrayLength = namesArray.length;

  const [spinAngle, setSpinAngle] = useState(0);
  const [result, setResult] = useState(null);

  if (namesArray.length === 1) {
    namesArray = [namesArray[0], namesArray[0], namesArray[0], namesArray[0]];
  } else if (namesArray.length === 2) {
    namesArray = [namesArray[0], namesArray[0], namesArray[1], namesArray[1]];
  } else if (namesArray.length === 3) {
    namesArray = [
      namesArray[0],
      namesArray[0],
      namesArray[1],
      namesArray[1],
      namesArray[2],
      namesArray[2],
    ];
  }

  const calculateSkewMultiplier = () => {
    let sum = 0;

    for (let i = 5; i <= namesArray.length; i++) {
      sum -= 0.25;
    }

    return sum;
  };

  const skewMultiplier = calculateSkewMultiplier();
  let swapColors = false;

  const getInitials = (name, index) => {
    if (namesArray[index] === namesArray[index - 1]) {
      swapColors = !swapColors;
      return "";
    }

    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      const firstInitial = nameParts[0].charAt(0).toUpperCase();
      const lastInitial = nameParts[nameParts.length - 1]
        .charAt(0)
        .toUpperCase();
      return firstInitial + lastInitial;
    }
  };
  let previousColor;

  const getSegmentColor = (index) => {
    if (namesArray[index] === namesArray[index - 1]) {
      return previousColor;
    }

    if (initialArrayLength === 2) {
      if (index < 2) {
        previousColor = bgColor1;
        return bgColor1;
      } else {
        previousColor = bgColor2;
        return bgColor2;
      }
    } else if (initialArrayLength === 3) {
      if (index < 2) {
        previousColor = bgColor1;
        return bgColor1;
      } else if (index < 4) {
        previousColor = bgColor2;
        return bgColor2;
      } else {
        previousColor = bgColor3;
        return bgColor3;
      }
    }

    if (index === 0) {
      previousColor = bgColor1;
      return bgColor1;
    } else if (
      (index % 2 === 0 && !swapColors) ||
      (index % 2 !== 0 && swapColors)
    ) {
      previousColor = bgColor3;
      return bgColor3;
    }
    if ((index % 2 !== 0 && !swapColors) || (index % 2 === 0 && swapColors)) {
      previousColor = bgColor2;
      return bgColor2;
    }
  };

  let previousTextColor;

  const getTextColor = (index) => {
    if (index === 0) {
      previousTextColor = textColor1;
      return textColor1;
    }

    if (namesArray[index] === namesArray[index - 1]) {
      return previousTextColor;
    }

    if (initialArrayLength === 2) {
      if (index < 2) {
        previousTextColor = textColor1;
        return textColor1;
      } else {
        previousTextColor = textColor2;
        return textColor2;
      }
    } else if (initialArrayLength === 3) {
      if (index < 2) {
        previousTextColor = textColor1;
        return textColor1;
      } else if (index < 4) {
        previousTextColor = textColor2;
        return textColor2;
      } else {
        previousTextColor = textColor3;
        return textColor3;
      }
    }

    if (index === 0) {
      previousTextColor = textColor1;
      return textColor1;
    } else if (
      (index % 2 === 0 && !swapColors) ||
      (index % 2 !== 0 && swapColors)
    ) {
      previousTextColor = textColor3;
      return textColor3;
    }
    if ((index % 2 !== 0 && !swapColors) || (index % 2 === 0 && swapColors)) {
      previousTextColor = textColor2;
      return textColor2;
    }
  };

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

  function getNameRotation() {
    const sections = initialArrayLength;
    const nameRotation = 360 / (2 * sections);
    if (sections === 1) {
      return "0";
    } else if (sections === 2) {
      return "90";
    } else {
      return nameRotation;
    }
  }

  function getZIndex(index) {
    const sections = initialArrayLength;

    if (sections === 1 && index === 0) {
      return "1";
    } else if (sections === 2 && (index === 0 || index === 2)) {
      return "1";
    } else if (sections === 3 && (index === 0 || index === 2 || index === 4)) {
      return "1";
    } else {
      return "0";
    }
  }

  return (
    <section className="wheelSection">
      <div
        className="result"
        style={{ visibility: result === null ? "hidden" : "visible" }}
      >
        {result}!
      </div>
      <div className="wheelContainer">
        <div className="pointer"></div>
        <div
          className="wheel"
          style={{
            transform: `rotate(${spinAngle}deg)`,
            transition: "transform 2s ease-out",
          }}
        >
          {namesArray.map((name, index) => {
            const sections = namesArray.length;
            const angle = 360 / sections;
            const rotation = angle * index;
            const skew = angle * skewMultiplier;
            return (
              <div
                key={index}
                className="segment"
                style={{
                  transform: `rotate(${rotation}deg) skewY(${skew}deg)`,
                  backgroundColor: getSegmentColor(index),
                  zIndex: getZIndex(index),
                }}
              >
                <div
                  className="name"
                  style={{
                    color: getTextColor(index),
                    transform: `skewY(${skew * -1}deg) 
                    rotate(${getNameRotation()}deg) 
                    translateX(-50%)`,
                    fontSize: `${Math.max(
                      4,
                      Math.min(40, Math.floor(500 / namesArray.length))
                    )}px`,
                  }}
                >
                  {getInitials(name, index)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spinBtn" onClick={handleSpin}>
        Spin
      </button>
    </section>
  );
};

export default Wheel;
