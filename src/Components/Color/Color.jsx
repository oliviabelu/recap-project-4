import ColorForm from "../ColorForm/ColorForm";
import { CopyToClipboard } from "../CopyToClipboard/CopyToClipboard";
import "./Color.css";
import { useState, useEffect } from "react";

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
  const [isCopying, setIsCopying] = useState(false);
  const [contrastScore, setContrastScore] = useState("");

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

  function handleSetIsCopying() {
    setIsCopying(!isCopying);
  }

  async function handleCopyToClipboard() {
    handleSetIsCopying();

    try {
      await navigator.clipboard.writeText(hex);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (isCopying === true) {
      setTimeout(() => {
        handleSetIsCopying();
      }, 3000);
    }
  }, [isCopying]);

  function handleContrastScore(newContrastScore) {
    setContrastScore(newContrastScore);
  }

  useEffect(() => {
    async function postFetch() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [hex, contrastText] }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const contrastCheck = await response.json();

      handleContrastScore(contrastCheck.overall);
    }

    postFetch();
  }, [hex, contrastText]);

  function getScoreBackground() {
    switch (contrastScore) {
      case "Yup":
        return "#38c743";

      case "Kinda":
        return "#f8f807";

      case "Nope":
        return "#fd2b13";
      default:
        return "#c0c0c0";
    }
  }

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card__headline">{hex}</h2>
      <CopyToClipboard
        buttonName={isCopying ? "SUCCESFULLY COPIED!" : "COPY"}
        onCopyToClipboard={handleCopyToClipboard}
      />
      <h3 style={{ color: contrastText }}>{role}</h3>
      <p style={{ color: contrastText }}>contrast: {contrastText}</p>
      <p
        className="color-card__contrast-score"
        style={{ backgroundColor: getScoreBackground() }}
      >
        Overall Contrast Score: {contrastScore}
      </p>
      {isEdit ? (
        <>
          <ColorForm
            onColorButton={handleEditColor}
            initialData={{ role: role, hex: hex, contrastText: contrastText }}
            buttonName={"UPDATE COLOR"}
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
