import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import { useState } from "react";

//const color1 = initialColors[0];

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColors(newColor) {
    console.log("testest");
    setColors([{ id: uid(), ...newColor }, ...colors]);
    console.log(colors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColors={handleAddColors}></ColorForm>
      {colors.map((color) => (
        <Color
          key={color.id}
          hex={color.hex}
          role={color.role}
          contrastText={color.contrastText}
        ></Color>
      ))}
    </>
  );
}

export default App;
