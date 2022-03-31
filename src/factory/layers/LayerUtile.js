import Location from "./Location";

export default class LayerUtile {
  listLocations = [];
  constructor(initialLocation = []) {
    this.listLocations = initialLocation;
  }
  get items() {
    return [...this.listLocations];
  }

  get newId() {
    let max = 0;
    this.listLocations.forEach((item) => {
      if (item.id > max) max = item.id;
    });
    return max + 1;
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
  getItemById(id) {
    for (let i = 0; i < this.listLocations.length; i++) {
      if (this.listLocations[i].id === id) return this.listLocations[i];
    }
    return null;
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
