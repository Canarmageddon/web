function initLayers() {
  map.setLayoutProperty("country-label", "text-field", ["get", "name_fr"]);
  map.setLayoutProperty("state-label", "text-field", ["get", "name_fr"]);
  map.setLayoutProperty("settlement-label", "text-field", ["get", "name_fr"]);
  map.setLayoutProperty("settlement-subdivision-label", "text-field", [
    "get",
    "name_fr",
  ]);
  map.addSource("theRoute", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });

  map.addLayer({
    id: "theRoute",
    type: "line",
    source: "theRoute",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#cccccc",
      "line-opacity": 0.5,
      "line-width": 13,
      "line-blur": 0.5,
    },
  });

  // Source and layer for the bounding box
  map.addSource("theBox", {
    type: "geojson",
    data: {
      type: "Feature",
    },
  });
  map.addLayer({
    id: "theBox",
    type: "fill",
    source: "theBox",
    layout: {},
    paint: {
      "fill-color": "#FFC300",
      "fill-opacity": 0.5,
      "fill-outline-color": "#FFC300",
    },
  });
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  map.addLayer({
    id: "places",
    type: "circle",
    source: "places",
    paint: {
      "circle-color": "#4264fb",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.on("mouseenter", "places", (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
    currentMarker = e.features[0].id;
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });
  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
  map.on("preclick", "places", (e) => {
    add = false;
  });
  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
}

function updatePlacesDescription(index, description) {
  let data = map.getSource("places")._data;
  let found = false;
  for (let i = 0; i < data.features.length && !found; i++) {
    if (index == data.features[i].id) {
      data.features[i].properties.description = description;
      found = true;
    }
  }
  map.getSource("places").setData(data);
}
