export default function ScreenLogo() {
    return <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center" }}>
        <img src={process.env.PUBLIC_URL + '/favicon.ico'} />
    </div>

}