export default class PointOfInterest {
  constructor(id, description, longitude, latitude) {
    this.id = id;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  get formated() {
    return {
      type: "Feature",
      id: this.id,
      properties: { description: this.description },

      geometry: {
        type: "Point",
        coordinates: [this.longitude, this.latitude],
      },
    };
  }
}
