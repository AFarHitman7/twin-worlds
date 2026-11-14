export default function Divider({ text }) {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <em>{text}</em>
      <span />
    </div>
  );
}
