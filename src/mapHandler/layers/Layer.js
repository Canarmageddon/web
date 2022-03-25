import Location from "./Location";
const templateLayer = {
  id: "places",
  type: "circle",
  source: "places",
  paint: {
    "circle-color": "#4264fb",
    "circle-radius": 6,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};
export default class Layer {
  listLocations = [];
  constructor(initialLocation = []) {
    this.listLocations = initialLocation;
  }
  get items() {
    return [...this.listLocations];
  }

  get templateLayer() {
    let res = [];
    this.listLocations.forEach((element) => {
      res = [...res, element.formated];
    });
    return res;
  }

  get positions() {
    let res = [];
    this.listLocations.forEach((element) => {
      res = [...res, [element.longitude, element.latitude]];
    });
    return res;
  }

  addItem(item) {
    return new Layer([...this.listLocations, item]);
  }

  addItems(items) {
    return new Layer(this.items.concat(items));
  }

  removeItem(poi) {
    return new Layer([...this.listLocations.filter((elt) => elt.id != poi.id)]);
  }
}
