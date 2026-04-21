import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

//const color1 = initialColors[0];

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      {initialColors.map((color) => (
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
