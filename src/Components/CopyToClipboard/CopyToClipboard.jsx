import "./CopyToClipboard.css";

export function CopyToClipboard({ buttonName, onCopyToClipboard }) {
  function handleClick() {
    onCopyToClipboard();
  }

  return (
    <button type="button" onClick={handleClick} className="copy-button">
      {buttonName}
    </button>
  );
}
