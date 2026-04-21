import "./Color.css";

export default function Color({ hex, role, contrastText }) {
  console.log(hex);
  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <p className="color-card-headline">{hex}</p>
      <p style={{ color: contrastText }}>{role}</p>
      <p style={{ color: contrastText }}>contrast: {contrastText}</p>
    </article>
  );
}
