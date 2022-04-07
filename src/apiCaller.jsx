const url = process.env.REACT_APP_DATABASE_URL;

export const fetchPointOfInterest = async () =>
    await fetch(`${url}point_of_interest`).then(res => res.json())

export const fetchStep = async () =>
    await fetch(`${url}step`).then(res => res.json())

export const fetchTravels = async () => {
    const res = await fetch(`${url}travel`, {

    }).then(res => res.json())
    return res["hydra:member"];
}

export const fetchLocation = async (location) =>
    await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            location
        )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    ).then((res) => res.json());

export const fetchTripById = async (id) => await fetch(`${url}trips/${id}`).then(res => res.json());

export const deletePoi = async (id) => await fetch(`${url}point_of_interests/${id}`, { method: 'DELETE' }).then(res => res.json());

export const updatePoi = async (id, title, description) => {
    fetch('http://localhost/point_of_interests/25', {
        headers: { "Content-Type": "application/ld+json" },
        method: 'PUT',
        body: {

        },
    }).then(res => res.json())
}