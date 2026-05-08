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
  const [contrastScore, setContrastScore] = useState("Checking");

  function handleEditColor(data) {
    setIsEdit(!isEdit);
    onEditColor({ id, ...data });
  }

  async function handleCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(hex);
    } catch (error) {
      console.error(error.message);
    }
    setIsCopying(!isCopying);
  }

  useEffect(() => {
    if (isCopying === true) {
      const timeoutID = setTimeout(() => {
        setIsCopying(!isCopying);
      }, 3000);

      return () => clearTimeout(timeoutID);
    }
  }, [isCopying]);

  useEffect(() => {
    async function postFetch() {
      try {
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

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data. Status Code: ${response.status}`,
          );
        }
        const contrastCheck = await response.json();

        setContrastScore(contrastCheck.overall);
      } catch (error) {
        console.error(error.message);
      }
    }

    postFetch();
  }, [hex, contrastText]);

  function getScoreBackground() {
    switch (contrastScore) {
      case "Yup":
        return "#3c8d41";

      case "Kinda":
        return "#fde82c";

      case "Nope":
        return "#ce1b2a";
      default:
        return "#c0c0c0";
    }
  }

  return (
    <article className="color-card__content" style={{ backgroundColor: hex }}>
      <div aria-label="card header" className="color-card__header">
        <h2 className="color-card__headline">{hex}</h2>
        <CopyToClipboard
          buttonName={isCopying ? "SUCCESFULLY COPIED!" : "COPY"}
          onCopyToClipboard={handleCopyToClipboard}
        />
      </div>
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
            buttonName={"update color"}
          />
          <button type="button" onClick={() => setIsEdit(!isEdit)}>
            cancel
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
              <button type="button" onClick={() => setConfirmation(false)}>
                cancel
              </button>
              <button type="button" onClick={() => onDeleteColor(id)}>
                delete
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setConfirmation(true)}>
                delete
              </button>
              <button type="button" onClick={() => setIsEdit(!isEdit)}>
                edit
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
