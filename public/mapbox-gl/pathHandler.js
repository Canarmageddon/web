const setTravelType = (newTravelType) => {
  travelType = newTravelType;
  generateRoute();
};

/* const generateRoute = async () => {
  if (lstDestination.length < 2) {
    map.setLayoutProperty("theRoute", "visibility", "none");
    return;
  }
  let route;
  let routeLine;
  if (travelType == "none") {
    let coordinates = [];
    lstDestination.map((des) => {
      coordinates = [...coordinates, des.center];
    });
    routeLine = { type: "LineString", coordinates };
    map.getSource("theRoute").setData(routeLine);
    map.setLayoutProperty("theRoute", "visibility", "visible");
  } else {
    let points = "";
    for (let i = 0; i < lstDestination.length; i++) {
      points += lngLatToString(lstDestination[i].center) + ";";
    }
    points = points.slice(0, -1);
    route = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${travelType}/${points}.json?geometries=polyline&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoiYXNsbmRza3ZucWRvZm1uIiwiYSI6ImNreWJyN3VkZzBpNnUydm4wcnJ5MmdvYm0ifQ.YNwpI3-HgF6nMhdaRRkKBg`
    ).then((res) => res.json());
    route = route.routes[0];
    routeLine = polyline.toGeoJSON(route.geometry);
  }

  // Make each route visible
  map.setLayoutProperty("theRoute", "visibility", "visible");
  map.setLayoutProperty("theBox", "visibility", "visible");
  // Get GeoJSON LineString feature of route

  // Create a bounding box around this route
  // The app will find a random point in the new bbox

  bbox = turf.bbox(routeLine);
  polygon = turf.bboxPolygon(bbox);
  // Update the data for the route
  // This will update the route line on the map
  map.getSource("theRoute").setData(routeLine);

  // Update the box
  map.getSource("theBox").setData(polygon);
  if (travelType == "none") {
    map.setLayoutProperty("theBox", "visibility", "none");
    return;
  }

  const clear = turf.booleanDisjoint(obstacle, routeLine);
  if (clear === true) {
    collision = "does not intersect any obstacles!";
    detail = `takes ${(route.duration / 60).toFixed(0)} minutes and avoids`;
    emoji = "✔️";
    map.setPaintProperty("theRoute", "line-color", "#74c476");
    // Hide the box
    map.setLayoutProperty("theBox", "visibility", "none");
    // Reset the counter
    counter = 0;
  } else {
    // Collision occurred, so increment the counter
    counter = counter + 1;
    // As the attempts increase, expand the search area
    // by a factor of the attempt count
    polygon = turf.transformScale(polygon, counter * 0.01);
    bbox = turf.bbox(polygon);
    collision = "is bad.";
    detail = `takes ${(route.duration / 60).toFixed(0)} minutes and hits`;
    emoji = "⚠️";
    map.setPaintProperty("theRoute", "line-color", "#de2d26");

    // Add a randomly selected waypoint to get a new route from the Directions API
    const randomWaypoint = turf.randomPoint(1, { bbox: bbox });
    directions.setWaypoint(
      0,
      randomWaypoint["features"][0].geometry.coordinates
    );
  }
}; */
const generateRoute = () => {
  const stepLayer = LocationHandler.state.stepLayer;
  if (stepLayer.length < 2) {
    map.setLayoutProperty("theRoute", "visibility", "none");
    return;
  }
  let route;
  let routeLine;
  let coordinates = [];

  routeLine = { type: "LineString", coordinates: stepLayer.positions };
  map.getSource("theRoute").setData(routeLine);
  map.setLayoutProperty("theRoute", "visibility", "visible");
  //map.setLayoutProperty("theBox", "visibility", "visible");
};

function clear() {
  map.setLayoutProperty("theRoute", "visibility", "none");
  map.setLayoutProperty("theBox", "visibility", "none");
}
const lngLatToString = (lngLat) => {
  return lngLat[0] + "," + lngLat[1];
};
