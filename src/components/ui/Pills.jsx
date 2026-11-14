export default function Pills({ label = "Also used", items, className }) {
  return (
    <div className={className ? `pills ${className}` : "pills"}>
      <span className="pills__label">{label}</span>
      {items.map((item) => (
        <span className="pill" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
