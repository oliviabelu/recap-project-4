export function CopyToClipboard({ buttonName, onCopyToClipboard }) {
  function handleClick() {
    onCopyToClipboard();
  }

  return (
    <button type="button" onClick={handleClick}>
      {buttonName}
    </button>
  );
}
