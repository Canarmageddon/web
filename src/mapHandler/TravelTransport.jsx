import { useState } from "react"
import Button from "react-bootstrap/Button";

const TravelTransport = () => {
    const transportWays = ["Voiture", "A pied", "Vélo"]
    const [selectedValue, setSelectedValue] = useState(-1);
    const handleClick = (newValue) => {
        setSelectedValue(newValue)
    }
    return <>
        {transportWays.map((data, i) =>
            <Button key={i} onClick={() => handleClick(data)}>{data}</Button>
        )}

    </>
}
export default TravelTransport