import { useState, useEffect } from "react";
import "./App.css";
import Wheel from "./components/Wheel";
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker";
import UserList from "./components/UserList";

function App() {
  const [backgroundColors, setBackgroundColors] = useState([null, null, null]);
  const [textColors, setTextColors] = useState([null, null]);
  const [namesArray, setNamesArray] = useState([]);

  // Function to retrieve colors from localStorage
  const getStoredColors = () => {
    return {
      backgroundColors: [
        localStorage.getItem("color1") || "#FF4500",
        localStorage.getItem("color2") || "#3CB371",
        localStorage.getItem("color3") || "#483D8B",
      ],
      textColors: [
        localStorage.getItem("color4") || "#f2f2f2",
        localStorage.getItem("color5") || "#f2f2f2",
        localStorage.getItem("color6") || "#f2f2f2",
      ],
    };
  };

  // Retrieve colors from localStorage when the component mounts
  useEffect(() => {
    const { backgroundColors, textColors } = getStoredColors();
    setBackgroundColors(backgroundColors);
    setTextColors(textColors);
  }, []);

  if (backgroundColors.includes(null) || textColors.includes(null)) {
    return <div></div>;
  }

  // Unified handlers for background and text colors
  const handleBackgroundColorChange = (index, newColor) => {
    const updatedColors = [...backgroundColors];
    updatedColors[index] = newColor;
    setBackgroundColors(updatedColors);
    localStorage.setItem(`color${index + 1}`, newColor);
  };

  const handleTextColorChange = (index, newColor) => {
    const updatedColors = [...textColors];
    updatedColors[index] = newColor;
    setTextColors(updatedColors);
    localStorage.setItem(`color${index + 4}`, newColor);
  };

  const handleNamesArrayChange = (newNamesArray) => {
    setNamesArray(newNamesArray);
  };

  return (
    <>
      <Header color1={backgroundColors[0]} color4={textColors[0]} />
      <Wheel
        color1={backgroundColors[0]}
        color2={backgroundColors[1]}
        color3={backgroundColors[2]}
        color5={textColors[0]}
        color6={textColors[1]}
        color7={textColors[2]}
        namesArray={namesArray}
      />
      <section className="menu">
        <ColorPicker
          backgroundColors={backgroundColors}
          textColors={textColors}
          onBackgroundColorChange={handleBackgroundColorChange}
          onTextColorChange={handleTextColorChange}
        />
        <UserList
          namesArray={namesArray}
          onNamesArrayChange={handleNamesArrayChange}
        />
      </section>
    </>
  );
}

export default App;
