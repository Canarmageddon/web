export default function ({ id }) {
    return <div>
        <img src={`${process.env.REACT_APP_DATABASE_URL}pictures/file/${id}`}
            style={{ width: "30vw" }} />
    </div>
}