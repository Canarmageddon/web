const url = process.env.REACT_APP_DATABASE_URL;

export const fetchPointOfInterest = async () =>
  await fetch(`${url}point_of_interest`).then((res) => res.json());

export const fetchStep = async () =>
  await fetch(`${url}step`).then((res) => res.json());

export const fetchTravels = async () => {
  const res = await fetch(`${url}trips`, {}).then((res) => res.json());
  return res["hydra:member"];
};

export const fetchLocation = async (location) =>
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      location
    )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  ).then((res) => res.json());

export const fetchTripById = async (id) =>
  await fetch(`${url}trips/${id}`).then((res) => res.json());

export const deletePoi = async (id) =>
  await fetch(`${url}point_of_interests/${id}`, { method: "DELETE" }).then(
    (res) => res.json()
  );

export const createPoi = async (longitude, latitude) => {

  return await fetch(`${url}point_of_interests`, {
    method: 'POST',
    headers: {
      'accept': 'application/ld+json',
      'Content-Type': 'application/ld+json'
    },
    body: JSON.stringify({
      longitude, latitude
    })
  }).then(res => res.json());
}
export const updatePoi = async (id, title, description) => {
  return await fetch(`${url}point_of_interests/${id}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/ld+json',
      'Content-Type': 'application/ld+json'
    },
    body: JSON.stringify({
      title, description
    })
  }).then(res => res.json());
};
