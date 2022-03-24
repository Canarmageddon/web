import PointOfInterest from "./PointOfInterest";
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
export default class PointOfInterestLayer {
  listPOI = [];
  constructor(initialPOI = []) {
    this.listPOI = initialPOI;
  }
  get items() {
    return [...this.listPOI];
  }

  get templateLayer() {
    let res = [];
    this.listPOI.forEach((element) => {
      res = [...res, element.formated];
    });
    return res;
  }

  addItem(item) {
    return new PointOfInterestLayer([...this.listPOI, item]);
  }

  addItems(items) {
    return new PointOfInterestLayer(this.items.concat(items));
  }

  removeItem(poi) {
    return new PointOfInterestLayer([
      ...this.listPOI.filter((elt) => elt.id != poi.id),
    ]);
  }
}
