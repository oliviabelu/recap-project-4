import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  console.log(colors);

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      {colors.length !== 0 ? (
        <ul>
          {colors.map((color) => (
            <li key={color.id} className="color-card">
              <Color
                id={color.id}
                hex={color.hex}
                role={color.role}
                contrastText={color.contrastText}
                onDeleteColor={handleDeleteColor}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No colors... start by ading one!</div>
      )}
    </>
  );
}

export default App;
