const url = process.env.REACT_APP_DATABASE_URL;

/* ------------ STEP -----------------------*/

export const fetchStep = async () =>
  await fetch(`${url}steps`).then((res) => res.json());

export const createStep = async ({ latitude, longitude, id }) => {
  await fetch(`${url}steps/new`, {
    method: "POST",
    headers: {
      accept: "applicaiton/ld+json",
      "Content-Type": "applicaiton/ld+json",
    },
    body: JSON.stringify({
      longitude,
      latitude,
      trip: parseInt(id),
      description: "",
      creator: 4,
    }),
  }).then((res) => res.json());
};

export const deleteStep = async (id) =>
  await fetch(`${url}steps/${id}`, { method: "DELETE" }).then((res) => {
    if (res.statusCode != 204) {
      return res.json();
    }
    return null;
  });
export const fetchSteps = async (id) =>
  await fetch(`${url}trips/${id}/steps`)
    .then((res) => checkStatus(res))
    .then((res) => res.json());

/* -------------------------------------------*/

/* ------------ POI -----------------------*/

export const fetchPointOfInterest = async () =>
  await fetch(`${url}point_of_interest`)
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const createTrip = async (name) => {
  return await fetch(`${url}trips/new`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      name,
    }),
  }).then((res) => res.json());
};

export const deletePoi = async (id) =>
  await fetch(`${url}point_of_interests/${id}`, { method: "DELETE" }).then(
    (res) => res.json()
  );

export const createPoi = async ({ latitude, longitude, id }) => {
  return await fetch(`${url}point_of_interests/new`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      longitude,
      latitude,
      trip: parseInt(id),
      creator: 1,
    }),
  }).then((res) => res.json());
};

export const updatePoi = async (id, title, description, step) => {
  return await fetch(`${url}point_of_interests/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      title,
      description,
      step,
    }),
  }).then((res) => res.json());
};
export const fetchPois = async (id) =>
  await fetch(`${url}trips/${id}/poi`)
    .then((res) => checkStatus(res))
    .then((res) => res.json());

/* -------------------------------------------*/

/* ------------ USER -----------------------*/

export const fetchAllUser = async (id) =>
  await fetch(`${url}trips/${id}/users`)
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const addUser = async ({ email, id }) => {
  return await fetch(`${url}trips/addUser`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      email,
      trip: id,
    }),
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};

export const removeUser = async ({ email, id }) => {
  return await fetch(`${url}trips/removeUser`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      email: email,
      trip: id,
    }),
  }).then((res) => res.json);
};
export const deleteUser = async (id) =>
  await fetch(`${url}users/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

/* -------------------------------------------*/

/* ------------ TO DO LIST -----------------------*/

export const fetchTodoLists = async (id) => {
  return await fetch(`${url}trips/${id}/toDoLists`)
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};

export const createTodoList = async ({ title, id }) => {
  console.log(title);
  console.log(id);
  await fetch(`${url}to_do_lists/new`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      name: title,
      trip: parseInt(id),
    }),
  });
};

export const deleteTodoList = async (id) =>
  await fetch(`${url}to_do_lists/${id}`, { method: "DELETE" });

export const createTask = async ({ title, id, date }) => {
  await fetch(`${url}tasks/new`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      name: title,
      description: "", //TODO
      creator: 1, //TODO User connecté
      toDoList: id,
      date: date,
    }),
  });
};

export const deleteTask = async (id) =>
  await fetch(`${url}tasks/${id}`, { method: "DELETE" });

/* -------------------------------------------*/

/* ------------ TRAVEL -----------------------*/

export const fetchTravels = async () => {
  const res = await fetch(`${url}trips`, {}).then((res) => res.json());
  return res["hydra:member"];
};

export const createTravel = async (title, id) =>
  await fetch(`${url}travel/new`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({}),
  });

export const deleteTravel = async (id) =>
  await fetch(`${url}travel/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

/* -------------------------------------------*/

/* ------------ TRIP -----------------------*/

export const fetchTripById = async (id) =>
  await fetch(`${url}trips/${id}`, {
    method: "GET",
  }).then((res) => {
    if (res.status == 404) {
      return -1;
    } else {
      return res.json();
    }
  });

export const deleteTrip = async (id) =>
  await fetch(`${url}trips/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

/* -------------------------------------------*/

export const fetchLocation = async (location) =>
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      location
    )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  ).then((res) => res.json());

export const deleteDocument = async (id) =>
  await fetch(`${url}documents/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

/* -------------------------------------------*/

const checkStatus = async (response) => {
  if (response.ok) {
    return response;
  } else {
    return response.json().then((text) => {
      throw new Error(text.message);
    });
  }
};
