export default class Location {
  constructor(id, description, title, longitude, latitude, step) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
    this.step = step;
  }
  get formated() {
    return {
      type: "Feature",
      id: this.id,
      properties: {
        description: this.description,
      },

      geometry: {
        type: "Point",
        coordinates: [this.longitude, this.latitude],
      },
    };
  }
}
