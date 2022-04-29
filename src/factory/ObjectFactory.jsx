import Travel from "./Travel";
import Trip from "./Trip";
import Itinerary from "./Itinerary";
export default function generateObject(data) {
  let res = [];
  data.map((d) => {
    let trip = new Trip(d.id);
    d.travels.map((t) => {
      let travel = new Travel(d.duration, d.id, trip, d.start.name, d.end.name);
    });
    res.push[travel];
  });
  return res;
}
