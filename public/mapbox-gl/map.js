let add = true;
let id = 0;
let currentMarker = null;
const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

function createMap() {
  map = new mapboxgl.Map({
    container: "map", // Specify the container ID
    style: "mapbox://styles/mapbox/streets-v11", // Specify which map style to use

    center: [-77.020945, 38.878241], // Specify the starting position [lng, lat]
    zoom: 13, // Specify the starting zoom
  });

  map.on("click", function (e) {
    let data = map.getSource("places")._data;
    //PoiHandler.addItem(id, "", e.lngLat.lng, e.lngLat.lat);

    if (add) {
      PopUpHandler.setState({ display: true, idPopUp: 100, description: "" });
      PoiHandler.addItem(id, "", e.lngLat.lng, e.lngLat.lat);
      data.features = PoiHandler.state.poiLayer.templateLayer;

      map.getSource("places").setData(data);
      currentMarker = id;
      id++;
    } else {
      popup.remove();
      add = true;
      features = data.features.filter((el) => el.id != currentMarker);
      data.features = features;
      map.getSource("places").setData(data);
      PopUpHandler.setState({
        display: false,
        idPopUp: null,
        description: null,
      });
    }
  });

  map.on("load", () => {
    initLayers();
  });
}

/*     function addCard(id, element, clear, detail) {
      const card = document.createElement("div");
      card.className = "card";
      // Add the response to the individual report created above
      const heading = document.createElement("div");
      // Set the class type based on clear value
      heading.className =
        clear === true ? "card-header route-found" : "card-header obstacle-found";
      heading.innerHTML =
        id === 0
          ? `${emoji} The route ${collision}`
          : `${emoji} Route ${id} ${collision}`;

      const details = document.createElement("div");
      details.className = "card-details";
      details.innerHTML = `This ${detail} obstacles.`;

      card.appendChild(heading);
      card.appendChild(details);
      element.insertBefore(card, element.firstChild);
    } */

/*     function noRoutes(element) {
      const card = document.createElement("div");
      card.className = "card";
      // Add the response to the individual report created above
      const heading = document.createElement("div");
      heading.className = "card-header no-route";
      emoji = "🛑";
      heading.innerHTML = `${emoji} Ending search.`;

      // Add details to the individual report
      const details = document.createElement("div");
      details.className = "card-details";
      details.innerHTML = `No clear route found in ${counter} tries.`;

      card.appendChild(heading);
      card.appendChild(details);
      element.insertBefore(card, element.firstChild);
    } */

/*     directions.on("clear", () => {
      map.setLayoutProperty("theRoute", "visibility", "none");
      map.setLayoutProperty("theBox", "visibility", "none");

      counter = 0;
      reports.innerHTML = "";
    }); */

/*   directions.on("route", (event) => {
      // Hide the route and box by setting the opacity to zero
      map.setLayoutProperty("theRoute", "visibility", "none");
      map.setLayoutProperty("theBox", "visibility", "none");

      if (counter >= maxAttempts) {
        noRoutes(reports);
      } else {
        // Make each route visible
        for (const route of event.route) {
          // Make each route visible
          map.setLayoutProperty("theRoute", "visibility", "visible");
          map.setLayoutProperty("theBox", "visibility", "visible");

          // Get GeoJSON LineString feature of route
          const routeLine = polyline.toGeoJSON(route.geometry);

          // Create a bounding box around this route
          // The app will find a random point in the new bbox
          bbox = turf.bbox(routeLine);
          polygon = turf.bboxPolygon(bbox);

          // Update the data for the route
          // This will update the route line on the map
          map.getSource("theRoute").setData(routeLine);

          // Update the box
          map.getSource("theBox").setData(polygon);

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
          // Add a new report section to the sidebar
          addCard(counter, reports, clear, detail);
        }
      }
    });
   */
