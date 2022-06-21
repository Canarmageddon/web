const url = process.env.REACT_APP_DATABASE_URL;

/* ------------ STEP -----------------------*/

export const fetchSteps = async (token, id) =>
  await fetch(`${url}trips/${id}/steps`, {
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const createStep = async ({ token, latitude, longitude, id, creator }) =>
  await fetch(`${url}steps`, {
    method: "POST",
    headers: {
      accept: "applicaiton/ld+json",
      "Content-Type": "applicaiton/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      longitude,
      latitude,
      trip: parseInt(id),
      creator,
    }),
  }).then((res) => res.json());

export const deleteStep = async ({ token, id }) =>
  await fetch(`${url}steps/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
  }).then((res) => checkStatus(res));

export const moveStep = async ({ token, id, latitude, longitude }) => {
  return await fetch(`${url}steps/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      longitude,
      latitude,
    }),
  }).then((res) => res.json());
};

export const getDocumentsFromStep = async (token, id) =>
  await fetch(`${url}steps/${id}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const updateStep = async ({ token, id, description, date }) => {
  console.log(token, id, description, date)
  return await fetch(`${url}steps/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description, date
    }),
  }).then((res) => res.json());
};

/* -------------------------------------------*/

/* ------------ POI -----------------------*/

export const fetchPois = async (token, id) =>
  await fetch(`${url}trips/${id}/poi`, {
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const deletePoi = async ({ token, id }) => {
  return await fetch(`${url}point_of_interests/${id}`, {
    headers: { Authorization: `Bearer ${token}`, },
    method: "DELETE",
  }).then((res) => checkStatus(res));
}

export const createPoi = async ({
  token,
  latitude,
  longitude,
  id,
  creator,
}) => {
  return await fetch(`${url}point_of_interests`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      longitude,
      latitude,
      trip: parseInt(id),
      creator,
    }),
  }).then((res) => res.json());
};

export const movePoi = async ({ token, id, latitude, longitude }) => {
  return await fetch(`${url}point_of_interests/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      longitude,
      latitude,
    }),
  }).then((res) => res.json());
};

export const updatePoi = async ({ token, id, title, description, step }) => {
  return await fetch(`${url}point_of_interests/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      step: parseInt(step),
    }),
  }).then((res) => res.json());
};

export const getDocumentsFromPoi = async (token, id) =>
  await fetch(`${url}point_of_interests/${id}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

/* -------------------------------------------*/

/* ------------ LOCATION -----------------------*/

export const fetchLocations = async (token, id) =>
  await fetch(`${url}locations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

/* -------------------------------------------*/

/* ------------ USER -----------------------*/

export const signup = async (email, password, firstName, lastName) =>
  await fetch(`${url}users`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const checkCredentials = async (email, password) => {
  return await fetch(`${url}login`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};

export const whoAmI = async (token) =>
  await fetch(`${url}whoami`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const refresh = async (refresh_token) => {
  return await fetch(`${url}token/refresh`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({ refresh_token }),
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};
export const fetchAllUser = async ({ token, id }) =>
  await fetch(`${url}trips/${id}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const addUser = async ({ token, email, id }) => {
  return await fetch(`${url}trips/${id}/addUser`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};

export const removeUser = async ({ token, email, id }) => {
  return await fetch(`${url}trips/${id}/removeUser`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      trip: id,
    }),
  }).then((res) => res.json);
};

export const deleteUser = async (token, id) =>
  await fetch(`${url}users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  }).then((res) => res.json());

export const fetchUser = async ({ token, id }) => {
  return await fetch(`${url}users/${id}`, {
    method: "GET",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateUser = async ({ token, id, firstName, lastName }) => {
  return await fetch(`${url}users/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName,
      lastName
    }),
  }).then((res) => res.json());
};

/* -------------------------------------------*/

/* ------------ TO DO LIST -----------------------*/

export const fetchTodoLists = async ({ token, id }) => {
  return await fetch(`${url}trips/${id}/toDoLists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());
};

export const createTodoList = async ({ token, title, id }) => {
  await fetch(`${url}to_do_lists`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: title,
      trip: parseInt(id),
    }),
  });
};

export const deleteTodoList = async ({ token, id }) => {
  await fetch(`${url}to_do_lists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
};

export const createTask = async ({ token, title, id, date, creator }) =>
  await fetch(`${url}tasks`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: title,
      description: "",
      creator,
      toDoList: id,
      date: date,
      creator,
    }),
  });

export const deleteTask = async ({ token, id }) =>
  await fetch(`${url}tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
/* -------------------------------------------*/

/* ------------ TRAVEL -----------------------*/

export const fetchTravels = async ({ token, user }) =>
  await fetch(`${url}users/${user}/trips`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const createTravel = async ({ token, name, id }) =>
  await fetch(`${url}travel`, {
    method: "POST",
    headers: {
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  }).then((res) => checkStatus(res));

export const deleteTravel = async (id) =>
  await fetch(`${url}travel/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

/* -------------------------------------------*/

/* ------------ TRIP -----------------------*/

export const fetchTrips = async ({ token, user, isEnded }) =>
  await fetch(`${url}users/${user}/trips/${isEnded}/ended`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(res => checkStatus(res))
    .then(res => res.json())

export const createTrip = async ({ token, name, user }) => {
  return await fetch(`${url}trips`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      name,
      creator: user,
    }),
  }).then((res) => res.json());
};

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

export const deleteTrip = async ({ token, id }) =>
  await fetch(`${url}trips/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  }).then((res) => checkStatus(res));

export const fetchAllTrips = async (page) =>
  await fetch(`${url}trips?page=${page}`, {
    headers: {
      accept: "application/ld+json",
    },
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const generateTripLink = async (token, id) =>
  await fetch(`${url}trips/${id}/generateLink`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const checkLink = async (id, link) =>
  await fetch(`${url}trips/${id}/checkLink/${link}`).then((res) =>
    checkStatus(res)
  );

export const cloneTrip = async ({ id, name, creator }) =>
  await fetch(`${url}trips/${id}/clone`, {
    method: 'PUT',
    body: JSON.stringify({
      name, creator
    })
  }).then((res) => checkStatus(res))


/* -------------------------------------------*/

/* -------------- ALBUM --------------------------*/

export const getAlbum = async (id) =>
  await fetch(`${url}trips/${id}/album`)
    .then(res => checkStatus(res))
    .then(res => res.json())

/* -------------------------------------------*/

/* -------------- LOGBOOK --------------------------*/

export const getLogBookEntries = async (token, id) =>
  await fetch(`${url}albums/${id}/logBookEntries`, {
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const getLogBookEntriesByLocation = async (id) =>
  await fetch(`${url}locations/${id}/logBookEntries`)
    .then(res => checkStatus(res))
    .then(res => res.json())

/* -------------------------------------------*/

/* -------------- PICTURES --------------------------*/

export const getPictures = async (token, id) =>
  await fetch(`${url}albums/${id}/pictures`, {
  })
    .then((res) => checkStatus(res))
    .then((res) => res.json());

export const getPicturesByLocation = async (id) =>
  await fetch(`${url}locations/${id}/pictures`)
    .then(res => checkStatus(res))
    .then(res => res.json())

/* -------------------------------------------*/

/* -------------- DOCUMENT --------------------------*/

export const addDocument = async ({
  token,
  file,
  creator,
  mapElement,
  name,
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("creator", creator),
    formData.append("mapElement", mapElement);
  formData.append("name", name);
  return await fetch(`${url}documents`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: formData,
  });
};

export const getDocument = async (token, id, name) => {
  fetch(`${url}documents/file/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
    });
  });
};

export const deleteDocument = async ({ token, id }) =>
  await fetch(`${url}documents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
  }).then((res) => res.json());

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

export const fetchLocation = async (location) =>
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      location
    )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  ).then((res) => res.json());
