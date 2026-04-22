import { useState } from "react";

export function ColorInput({ id, defaultValue }) {
  const [color, setColor] = useState(defaultValue);

  function handleChange(event) {
    setColor(event.target.value);
  }

  return (
    <div className="color-form__input">
      <input
        id={id}
        type="text"
        name={id}
        value={color}
        onChange={handleChange}
      />
      <input type="color" value={color} onChange={handleChange} />
    </div>
  );
}
