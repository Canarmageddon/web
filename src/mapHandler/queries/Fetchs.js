import {
  fetchPois,
  fetchSteps,
  fetchLocations,
  getPictures,
} from "../../apiCaller";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LayerUtile from "../../factory/layers/LayerUtile";
import Location from "../../factory/layers/Location";

export function steps(token, id, setRouteSource, setViewport) {
  return useQuery(["steps", id], () => fetchSteps(token, id), {
    retry: false,
    onSuccess: (data) => {
      let lstStep = [];
      data.map((item) => {
        lstStep.push(
          new Location({
            id: item.id,
            description: item.description,
            title: item.title,
            longitude: item.location.longitude,
            latitude: item.location.latitude,
            step: item?.step?.id,
          }),
        );
      });
      setRouteSource(new LayerUtile(lstStep));
      /*       setViewport({
        latitude: data[data?.length - 1]?.location?.latitude,
        longitude: data[data?.length - 1]?.location?.longitude,
        zoom: 7,
        bearing: 0,
        pitch: 0,
      }); */
    },
  });
}

export function pois(token, id, setPoiSource) {
  return useQuery(["poi", id], () => fetchPois(token, id), {
    retry: false,
    onSuccess: (data) => {
      let lstPoi = [];
      data.map((item) => {
        console.log(item.step);
        lstPoi.push(
          new Location({
            id: item.id,
            description: item.description,
            title: item.title,
            longitude: item.location.longitude,
            latitude: item.location.latitude,
            step: item?.step?.id,
          }),
        );
      });
      setPoiSource(new LayerUtile(lstPoi));
    },
  });
}

export function locations(token, id, setLocationSource, enabled) {
  return useQuery(["locations", id], () => fetchLocations(token, id), {
    enabled: enabled,
    retry: false,
    onSuccess: (data) => {
      let locationsList = [];
      data["hydra:member"].map((item) => {
        if (item.albumElements.length > 0)
          locationsList.push(
            new Location({
              id: item.id,
              longitude: item.longitude,
              latitude: item.latitude,
              albumElements: item.albumElements,
            }),
          );
      });
      setLocationSource(new LayerUtile(locationsList));
    },
  });
}

export function pictures(token, id, setImageList, enabled) {
  return useQuery(["explorePictures", id], () => getPictures(token, id), {
    enabled: enabled,
    onSuccess: (data) => {
      let formatedList = [];
      data.map((picture) => {
        formatedList = [
          ...formatedList,
          {
            type: "Feature",
            id: picture.id,
            geometry: {
              type: "Point",
              coordinates: [picture.id * 2, picture.id * 2], //TODO
            },
          },
        ];
      });
      setImageList({ type: "FeatureCollection", features: formatedList });
    },
  });
}

/* export function pictures(idLocation, enabled) {
  return useQuery(
    ["picturesByLocations", idLocation],
    () => getPicturesByLocation(idLocation),
    {
      enabled: enabled && idLocation != null,
    },
  );
}
 */
export function logBookEntries(idLocation, enabled) {
  return useQuery(
    ["LogBookEntriesByLocations", idLocation],
    () => getLogBookEntriesByLocation(idLocation),
    {
      enabled: enabled && idLocation != null,
    },
  );
}
