import "./Color.css";

export default function Color({ hex, role, contrastText }) {
  console.log(hex);
  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card__headline">{hex}</h2>
      <p style={{ color: contrastText }}>{role}</p>
      <p style={{ color: contrastText }}>contrast: {contrastText}</p>
    </article>
  );
}
