export default class Location {
  constructor({
    id,
    description,
    title,
    longitude,
    latitude,
    albumElements,
    step,
  }) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.albumElements = albumElements;
    this.description = description;
    this.title = title;
    this.step = step;
  }
  get formated() {
    return {
      type: "Feature",
      id: this.id,

      geometry: {
        type: "Point",
        coordinates: [this.longitude, this.latitude],
      },
    };
  }
}
