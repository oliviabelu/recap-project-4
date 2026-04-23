import "./Color.css";
import { useState } from "react";

export default function Color({ id, hex, role, contrastText, onDeleteColor }) {
  const [confirmation, setConfirmation] = useState(false);

  function handleCancelDelete() {
    setConfirmation(false);
  }

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card__headline">{hex}</h2>
      <h3 style={{ color: contrastText }}>{role}</h3>
      <p style={{ color: contrastText }}>contrast: {contrastText}</p>
      <div
        className="color-card__delete-buttons"
        role="group"
        aria-label="Deletion Button Group"
      >
        {confirmation ? (
          <>
            <span className="color-card__highlight">Really Delete?</span>
            <button type="button" onClick={handleCancelDelete}>
              CANCEL
            </button>
            <button type="button" onClick={() => onDeleteColor(id)}>
              DELETE
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setConfirmation(true)}>
            DELETE
          </button>
        )}
      </div>
    </article>
  );
}
