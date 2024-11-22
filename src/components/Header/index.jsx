import React from "react";
import "./style.css";

const Header = ({ color1, color4 }) => {
  // Function to adjust color1 slightly to create a complementary color
  const generateComplementaryColor = (color) => {
    // This function creates a lighter shade of the given color (just an example)
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Generate a lighter color by increasing the RGB values slightly
    const lighten = (value) => Math.min(255, value + 40).toString(16).padStart(2, "0");

    const newR = lighten(r);
    const newG = lighten(g);
    const newB = lighten(b);

    return `#${newR}${newG}${newB}`; // Return a complementary lightened color
  };

  const color2 = generateComplementaryColor(color1); // Generate a related color

  return (
    <header>
      <h1 style={{ color: color4, background: `linear-gradient(45deg, ${color1}, ${color2})` }}>
        Wheel of Destiny
      </h1>
    </header>
  );
};

export default Header;
