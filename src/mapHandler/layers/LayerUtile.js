import Location from "./Location";

export default class LayerUtile {
  listLocations = [];
  constructor(initialLocation = []) {
    this.listLocations = initialLocation;
  }
  get items() {
    return [...this.listLocations];
  }

  get templateSource() {
    let res = [];
    this.listLocations.forEach((element) => {
      res = [...res, element.formated];
    });
    return { type: "FeatureCollection", features: res };
  }

  get route() {
    let res = [];
    this.listLocations.forEach((element) => {
      res = [...res, [element.longitude, element.latitude]];
    });
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: res,
      },
    };
    return { type: "LineString", coordinates: res };
  }

  get positions() {
    let res = [];
    this.listLocations.forEach((element) => {
      res = [...res, [element.longitude, element.latitude]];
    });
    return res;
  }

  addItem(item) {
    return new LayerUtile([...this.listLocations, item]);
  }

  addItems(items) {
    return new LayerUtile(this.items.concat(items));
  }

  removeItem(id) {
    return new LayerUtile([
      ...this.listLocations.filter((elt) => elt.id != id),
    ]);
  }
}
