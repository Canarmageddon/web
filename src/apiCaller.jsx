const url = process.env.REACT_APP_DATABASE_URL;

export const fetchPointOfInterest = async () =>
    await fetch(`${url}point_of_interest`).then(res => res.json())
export const fetchTravels = async () =>
    await fetch(`${url}travel`).then(res => res.json())

export const fetchLocation = async (location) =>
    await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            location
        )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    ).then((res) => res.json());

