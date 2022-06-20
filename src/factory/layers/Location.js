export default class Location {
  constructor(id, longitude, latitude, albumElements) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.albumElements = albumElements;
  }
  get formated() {
    return {
      type: "Feature",
      id: this.id,

      geometry: {
        type: "Point",
        coordinates: [this.longitude, this.latitude]
      }
    };
  }
}
