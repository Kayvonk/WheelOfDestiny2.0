import "./style.css";

const ColorPicker = ({ backgroundColors, textColors, onBackgroundColorChange, onTextColorChange }) => {
  // Handle color change dynamically based on type and index
  const handleColorChange = (e, type, index) => {
    const newColor = e.target.value;
    if (type === "background") {
      onBackgroundColorChange(index, newColor);
    } else if (type === "text") {
      onTextColorChange(index, newColor);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="colorPickerHeading">Background</h2>
      {backgroundColors.map((color, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e, "background", index)}
            style={{
              width: "50px",
              height: "50px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>
      ))}

      <h2 className="colorPickerHeading">Text</h2>
      {textColors.map((color, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e, "text", index)}
            style={{
              width: "50px",
              height: "50px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
