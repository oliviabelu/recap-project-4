import { ColorInput } from "../ColorInput/ColorInput";

export default function ColorForm({
  onColorButton,
  initialData = {
    role: "some color",
    hex: "#123456",
    contrastText: "#ffffff",
  },
  buttonName,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    onColorButton(data);

    form.reset();
    form.elements.role.focus();
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">Role</label>
      <input
        id="role"
        type="text"
        name="role"
        className="color-form__input"
        defaultValue={initialData.role}
      />

      <label htmlFor="hex">Hex</label>
      <ColorInput id="hex" defaultValue={initialData.hex}></ColorInput>

      <label htmlFor="contrastText">Contrast Text</label>
      <ColorInput
        id="contrastText"
        defaultValue={initialData.contrastText}
      ></ColorInput>

      <button type="submit" className="color-form__button">
        {buttonName}
      </button>
    </form>
  );
}
