export default class Location {
  constructor({
    id,
    description,
    title,
    longitude,
    latitude,
    albumElements,
    step,
    date,
  }) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.albumElements = albumElements;
    this.description = description;
    this.title = title;
    this.step = step;
    this.date = date;
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
