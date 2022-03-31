import Travel from "./Travel";
import Itinerary from "./Itinerary";
export default function generateObject(data) {
    let res = []
    data.map((d) => {
        let itinerary = new Itinerary(d.itinerary.description, d.itinerary.id)
        let travel = new Travel(d.duration, d.id, itinerary, d.start.name, d.end.name);
        res = [...res, travel];
    })
    return res;
} 