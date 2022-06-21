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

  get templateSourceRoute() {
    let res = [];
    for (let i = 0; i < this.listLocations.length - 1; i++) {
      res = [...res, this.listLocations[i].formated];
    }
    return { type: "FeatureCollection", features: res };
    this.listLocations.forEach((element) => {
      res = [...res, element.formated];
    });
  }

  get templateSourceLast() {
    let res = [];
    if (this.listLocations.length > 1)
      res = this.listLocations[this.listLocations.length - 1].formated;
    return { type: "FeatureCollection", features: [res] };
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

  getPoiByStep(id) {
    let lstPoi = [];
    for (let i = 0; i < this.listLocations.length; i++) {
      if (this.listLocations[i].step == id) lstPoi.push(this.listLocations[i]);
    }
    return lstPoi;
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

  updateItem(item) {
    let index = this.listLocations.findIndex((obj) => obj.id == item.id);
    this.listLocations[index] = item;
    return this;
    return new LayerUtile([
      ...this.listLocations.filter((elt) => elt.id != item.id),
      item,
    ]);
  }
}
