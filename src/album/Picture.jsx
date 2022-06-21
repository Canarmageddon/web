export default function ({ id, width }) {
  return (
    <img
      src={`${process.env.REACT_APP_DATABASE_URL}pictures/file/${id}`}
      style={{ width: width }}
    />
  );
}
