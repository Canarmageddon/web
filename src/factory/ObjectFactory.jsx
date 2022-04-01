import Travel from "./Travel";
import Trip from "./Trip";
import Itinerary from "./Itinerary";
export default function generateObject(data) {
    let res = []
    data.map((d) => {
        let trip = new Trip(d.trip.id);
        let travel = new Travel(d.duration, d.id, trip, d.start.name, d.end.name);
        res = [...res, travel];
    })
    return res;
} 