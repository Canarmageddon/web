export default function LogBookEntry({ author, date, text }) {
    return <div>
        <p style={{ "scrollBehavior": "smooth" }}>{text}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
    </div>
}