import { useState } from "react"
import Button from "react-bootstrap/Button";

const TravelTransport = () => {
    const transportWays = [
        { label: "Voiture", value: "driving" },
        { label: "A pied", value: "walking" },
        { label: "Vélo", value: "cycling" }]
    const [selectedValue, setSelectedValue] = useState(-1);
    const handleClick = (newValue) => {
        if (newValue == selectedValue) {
            setSelectedValue("none")
            setTravelType("none")
        }
        else {
            setSelectedValue(newValue)
            setTravelType(newValue)
        }
    }
    return <>
        {transportWays.map((data, i) =>
            <Button key={i} onClick={() => handleClick(data.value)}>{data.label}</Button>
        )}

    </>
}
export default TravelTransport