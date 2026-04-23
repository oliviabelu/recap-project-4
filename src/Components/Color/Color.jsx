import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";
import { useState } from "react";

export default function Color({
  id,
  hex,
  role,
  contrastText,
  onDeleteColor,
  onEditColor,
}) {
  const [confirmation, setConfirmation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleConfirmationSet(bool) {
    setConfirmation(bool);
  }

  function handleIsEdit() {
    setIsEdit(!isEdit);
  }

  function handleEditColor(data) {
    handleIsEdit();
    onEditColor({ id: id, ...data });
  }

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card__headline">{hex}</h2>
      <h3 style={{ color: contrastText }}>{role}</h3>
      <p style={{ color: contrastText }}>contrast: {contrastText}</p>
      {isEdit ? (
        <>
          <ColorForm
            onColorButton={handleEditColor}
            initialData={{ role: role, hex: hex, contrastText: contrastText }}
            buttonName={"EDIT"}
          />
          <button type="button" onClick={handleIsEdit}>
            CANCEL
          </button>{" "}
        </>
      ) : (
        <div
          className="color-card__delete-buttons"
          role="group"
          aria-label="Deletion Button Group"
        >
          {confirmation ? (
            <>
              <span className="color-card__highlight">Really Delete?</span>
              <button
                type="button"
                onClick={() => handleConfirmationSet(false)}
              >
                CANCEL
              </button>
              <button type="button" onClick={() => onDeleteColor(id)}>
                DELETE
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => handleConfirmationSet(true)}>
                DELETE
              </button>
              <button type="button" onClick={handleIsEdit}>
                EDIT
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
