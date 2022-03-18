const url = process.env.REACT_APP_DATABASE_URL;

export const fetchPointOfInterest = async () =>
    await fetch(`${url}point_of_interest`).then(res => res.json())
