import { uid } from "uid";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export function Theme({
  themes,
  onChangeCurrentTheme,
  onAddTheme,
  onDeleteTheme,
  onUpdateThemeName,
}) {
  const [mode, setMode] = useState("view"); // "view" | "add" | "edit" | "deleteConfirmation"
  const [currentTheme, setCurrentTheme] = useLocalStorageState(
    "currentThemes",
    { defaultValue: { id: "t1", name: "Default Theme" } },
  );

  //---change current theme-------------------------------------------------------------
  function handleChangeCurrentTheme(event) {
    const { id } = themes.find((theme) => theme.name === event.target.value);
    setCurrentTheme({
      id: id,
      name: event.target.value,
    });
    console.log(currentTheme);
    onChangeCurrentTheme(id);
  }

  //---add a new theme------------------------------------------------------------------
  function handleAddTheme(event) {
    event.preventDefault();

    const newThemeId = uid();
    onAddTheme(newThemeId, event.target.elements.themeSelect.value);

    setCurrentTheme({
      id: newThemeId,
      name: event.target.elements.themeSelect.value,
    });
    setMode("view");

    event.target.reset();
  }

  //--edit themes name---------------------------------------------------------------------
  function handleEditThemeName(event) {
    setCurrentTheme((prevThemeName) => {
      return { ...prevThemeName, name: event.target.value };
    });
  }

  function handleUpdateThemeName(event) {
    event.preventDefault();
    const updatedName = event.target.elements.themeSelect.value;
    onUpdateThemeName(currentTheme.id, updatedName);
    setMode("view");

    event.target.reset();
  }

  function handleCancelEdit() {
    const { name } = themes.find((theme) => theme.id === currentTheme.id);
    setCurrentTheme({ ...currentTheme, name: name });
    setMode("view");
  }

  //---delete theme---------------------------------------------------------------------------
  function handleDelete() {
    onDeleteTheme(currentTheme.id);
    setMode("view");
    setCurrentTheme({ id: themes[0].id, name: themes[0].name });
  }

  return (
    <>
      {
        //---view MODE-------------------------------------------------------------------
        mode === "view" ? (
          <>
            <label htmlFor="theme-select"></label>
            <select
              name="themes"
              id="theme-select"
              value={currentTheme.name}
              onChange={handleChangeCurrentTheme}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setMode("add")}>
              add
            </button>
            <button
              type="button"
              onClick={() => setMode("edit")}
              disabled={currentTheme.id === "t1" ? true : false}
            >
              edit
            </button>
            <button
              type="button"
              onClick={() => setMode("deleteConfirmation")}
              disabled={currentTheme.id === "t1" ? true : false}
            >
              delete
            </button>{" "}
          </>
        ) : null
      }
      {
        //---add MODE-------------------------------------------------------------------
        mode === "add" ? (
          <>
            <form onSubmit={handleAddTheme}>
              <label htmlFor="theme-select">Theme Name:</label>
              <input id="theme-select" type="text" name="themeSelect"></input>

              <button type="submit">create</button>
              <button type="button" onClick={() => setMode("view")}>
                cancel
              </button>
            </form>
          </>
        ) : null
      }
      {
        //---edit MODE-------------------------------------------------------------------
        mode === "edit" ? (
          <>
            <form onSubmit={handleUpdateThemeName}>
              <label htmlFor="theme-select">Theme Name:</label>
              <input
                id="theme-select"
                type="text"
                name="themeSelect"
                value={currentTheme.name}
                onChange={handleEditThemeName}
              ></input>
              <button type="submit">update</button>
              <button type="button" onClick={handleCancelEdit}>
                cancel
              </button>
            </form>
          </>
        ) : null
      }
      {
        //---delete confirmation MODE-------------------------------------------------------------------
        mode === "deleteConfirmation" ? (
          <>
            <button type="button" onClick={handleDelete}>
              yes delete
            </button>
            <button type="button" onClick={() => setMode("view")}>
              cancel
            </button>
          </>
        ) : null
      }
    </>
  );
}
