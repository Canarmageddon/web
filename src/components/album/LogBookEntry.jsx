export default function LogBookEntry({ author, date, text }) {
  return (
    <div className="logbook-entry">
      <p>{author ?? "-"}</p>
      <p>{text ?? "-"}</p>
      <p>{new Date(date).toLocaleDateString() ?? "-"}</p>
    </div>
  );
}
