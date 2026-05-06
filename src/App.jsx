import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { Theme } from "./Components/Theme/Theme";
import { useState } from "react";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  //const [colors, setColors] = useState(initialColors);

  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  //const [currentThemeColors, setCurrentThemeColors] = useState(null);

  //localStorage.clear();
  //const [themes, setThemes] = useState(initialThemes);

  //---set current theme colors

  //---Color Handling------------------------------------------------------------------------------
  function handleAddColor(newColor) {
    console.log(newColor);
    const newUid = uid();
    setColors([{ id: newUid, ...newColor }, ...colors]);
    // setThemes(
    //   themes.map((theme) =>
    //     theme.isCurrentTheme === true
    //       ? { ...theme, colors: [...colors, newUid] }
    //       : theme,
    //   ),
    // );
  }

  function handleDeleteColor(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  function handleEditColor(editColor) {
    setColors(
      colors.map((color) =>
        color.id === editColor.id
          ? {
              ...color,
              ...editColor,
            }
          : color,
      ),
    );
  }

  //---Theme Handling------------------------------------------------------------------------------
  function handleChangeCurrentTheme(themeId) {
    setThemes(
      themes.map((theme) =>
        theme.id === themeId
          ? { ...theme, isCurrentTheme: true }
          : { ...theme, isCurrentTheme: false },
      ),
    );

    const { colors } = themes.find((theme) => theme.id === themeId);
    setColors(
      colors.map((color) =>
        initialColors.find((initialColor) => initialColor.id === color),
      ),
    );
  }

  function handleAddTheme(themeId, themeName) {
    const resetThemes = themes.map((theme) =>
      theme.isCurrentTheme === true
        ? { ...theme, isCurrentTheme: false }
        : theme,
    );
    setThemes([
      ...resetThemes,
      { id: themeId, name: themeName, colors: [], isCurrentTheme: true },
    ]);
    setColors([]);
  }

  function handleDeleteTheme(themeId) {
    setThemes(themes.filter((theme) => theme.id !== themeId));
  }

  function handleUpdateThemeName(themeId, themeName) {
    console.log(themeName, themeId);
    setThemes(
      themes.map((theme) =>
        theme.id === themeId ? { ...theme, name: themeName } : theme,
      ),
    );
  }
  console.log(themes);
  return (
    <>
      <h1 className="headline">Theme Creator</h1>
      <Theme
        themes={themes}
        onChangeCurrentTheme={handleChangeCurrentTheme}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onUpdateThemeName={handleUpdateThemeName}
      />
      <ColorForm onColorButton={handleAddColor} buttonName={"add color"} />
      {colors.length !== 0 ? (
        <ul className="color-cards">
          {colors.map((color) => (
            <li key={color.id} className="color-card">
              <Color
                id={color.id}
                hex={color.hex}
                role={color.role}
                contrastText={color.contrastText}
                onDeleteColor={handleDeleteColor}
                onEditColor={handleEditColor}
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
