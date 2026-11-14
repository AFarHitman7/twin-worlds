export default function Ghost({ children }) {
  return (
    <div className="ghost" aria-hidden="true">
      {children}
    </div>
  );
}
