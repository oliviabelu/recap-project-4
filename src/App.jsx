import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import { useState } from "react";

//const color1 = initialColors[0];

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      {colors.map((color) => (
        <Color
          key={color.id}
          hex={color.hex}
          role={color.role}
          contrastText={color.contrastText}
        />
      ))}
    </>
  );
}

export default App;
