import { useState } from "react";
import "./style.css";

const Wheel = () => {
  let bgColor1 = "rgb(255, 69, 0)";
  let bgColor2 = "rgb(60, 179, 113)";
  let bgColor3 = "rgb(72, 61, 139)";

  let namesArray = [
    "Mario Mario",
    "Luigi Mario",
    "Link Hyrule",
    "Zelda Hyrule",
    "Cloud Strife",
    "Tifa Lockhart",
    "Barret Wallace",
    "Aerith Gainsborough",
    "Squall Leonhart",
    "Rinoa Heartilly",
    "Zidane Tribal",
    "Vivi Ornitier",
    "Freya Crescent",
    "Noctis Lucis Caelum",
    "Ignis Scientia",
    "Gladiolus Amicitia",
    "Prompto Argentum",
    "Cecil Harvey",
    "Rosa Farrell",
    "Lara Croft",
    "Nathan Drake",
    "Joel Miller",
    "Ellie Williams",
    "Kratos Spartan",
    "Atreus Kratos",
    "Geralt Rivia",
    "Ciri Rivia",
    "Triss Merigold",
    "Dante Sparda",
    "Vergil Sparda",
    "Nero Sparda",
    "Lady Nero",
    "Ryu Hayabusa",
    "Jin Kazama",
    "Kazuya Mishima",
    "Nina Williams",
    "Heihachi Mishima",
    "Ken Masters",
    "Ryu Hoshi",
    "Chun-Li Zhang",
    "M. Bison",
    "Akuma Gouki",
    "Sagat Muay Thai",
    "Cammy White",
    "Blanka Silva",
    "E. Honda",
    "Felicia Aensland",
    "Jill Valentine",
    "Chris Redfield",
    "Leon Kennedy",
    "Claire Redfield",
    "Dante Sparda",
    "Luffy Monkey",
    "Zoro Roronoa",
    "Nami Swashbuckler",
    "Usopp Sniper",
    "Sanji Vinsmoke",
    "Tony Tony Chopper",
    "Nico Robin",
    "Vivi Nefertari",
    "Shanks Red",
    "Ace Portgas",
    "Izuku Midoriya",
    "Katsuki Bakugo",
    "Shoto Todoroki",
    "Eijiro Kirishima",
    "Tenya Iida",
    "Tsuyu Asui",
    "Momo Yaoyorozu",
    "Kanao Tsuyuri",
    "Tanjiro Kamado",
    "Roronoa Zoro",
    "Mikasa Ackerman",
    "Armin Arlert",
    "Jean Kirstein",
    "Levi Ackerman",
    "Hange Zoë",
    "Reiner Braun",
    "Eren Yeager",
    "Maki Oze",
    "Akane Tsunemori",
    "Kogami Shinya",
    "Shinya Kogami",
    "Saitama Amai",
    "Fubuki Kakashi",
    "Kenshiro Kasumi",
    "Jotaro Kujo",
    "Joseph Joestar",
    "Giorno Giovanna",
    "Naruto Uzumaki",
    "Sasuke Uchiha",
    "Kakashi Hatake",
    "Hinata Hyuga",
    "Sakura Haruno",
    "Shikamaru Nara",
    "Iruka Umino",
    "Neji Hyuga",
    "Killer Bee",
    "Itachi Uchiha",
    "Madara Uchiha",
    "Minato Namikaze",
  ];

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

  const getSegmentColor = (name, index) => {
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
      previousColor = bgColor2;
      return bgColor2;
    }
    if ((index % 2 !== 0 && !swapColors) || (index % 2 === 0 && swapColors)) {
      previousColor = bgColor3;
      return bgColor3;
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
                  backgroundColor: getSegmentColor(name, index),
                  zIndex: getZIndex(index),
                }}
              >
                <div
                  className="name"
                  style={{
                    // transform:
                    // `skewY(${skew * -1}deg)
                    // rotate(${nameRotation}deg)
                    // translateX(-50%)`,
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
