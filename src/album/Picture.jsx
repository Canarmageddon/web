export default function ({ id }) {
  return (
    <img
      src={`${process.env.REACT_APP_DATABASE_URL}pictures/file/${id}`}
      style={{ width: "25vw" }}
    />
  );
}
