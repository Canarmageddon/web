const searchPlace = async (location) => {
  const resLocation = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      location
    )}.json?access_token=${mapboxgl.accessToken}`
  ).then((res) => res.json());
  map.flyTo({ center: resLocation.features[0].center, zoom: 13 });
  lstDestination = [...lstDestination, resLocation.features[0]];
  generateRoute();
};
const removePlace = async (i) => {
  lstDestination.splice(i, 1);
  generateRoute();
};
