import { useState } from "react";
import "./style.css";

const Wheel = () => {
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
        previousColor = "rgb(255, 69, 0)";
        return "rgb(255, 69, 0)";
      } else {
        previousColor = "rgb(60, 179, 113)";
        return "rgb(60, 179, 113)";
      }
    } else if (initialArrayLength === 3) {
      if (index < 2) {
        previousColor = "rgb(255, 69, 0)";
        return "rgb(255, 69, 0)";
      } else if (index < 4) {
        previousColor = "rgb(60, 179, 113)";
        return "rgb(60, 179, 113)";
      } else {
        previousColor = "rgb(72, 61, 139)";
        return "rgb(72, 61, 139)";
      }
    }

    if (index === 0) {
      previousColor = "rgb(255, 69, 0)";
      return "rgb(255, 69, 0)";
    } else if (
      (index % 2 === 0 && !swapColors) ||
      (index % 2 !== 0 && swapColors)
    ) {
      previousColor = "rgb(60, 179, 113)";
      return "rgb(60, 179, 113)";
    }
    if ((index % 2 !== 0 && !swapColors) || (index % 2 === 0 && swapColors)) {
      previousColor = "rgb(72, 61, 139)";
      return "rgb(72, 61, 139)";
    }
  };

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
      <div
        className="result"
        style={{ visibility: result === null ? "hidden" : "visible" }}
      >
        Result: {result}
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
            const angle = 360 / namesArray.length;
            const rotation = angle * index;
            const skew = angle * skewMultiplier;

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
                    backgroundColor: getSegmentColor(name, index), // Set the background color dynamically
                  }}
                ></div>
                <div
                  className="name"
                  style={{
                    fontSize: `${Math.max(
                      4,
                      Math.min(40, Math.floor(1000 / namesArray.length))
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
