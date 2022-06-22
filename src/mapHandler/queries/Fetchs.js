import {fetchPois, fetchSteps, fetchLocations, getPictures, fetchAlbumElementLocations} from "../../apiCaller";
import {useQuery, useMutation, useQueryClient} from "react-query";
import LayerUtile from "../../factory/layers/LayerUtile";
import Location from "../../factory/layers/Location";
import { distanceInKmBetweenEarthCoordinates } from "../../Functions";

export function steps(
  token,
  id,
  routeSource,
  setRouteSource,
  setViewport,
  firstFetch,
  setFirstFetch,
) {
  return useQuery(["steps", id], () => fetchSteps(token, id), {
    retry: false,
    onSuccess: data => {
      let lstStep = [];
      data.map(item => {
        lstStep.push(new Location({
          id: item.id,
          description: item.description,
          title: item.title,
          longitude: item.location.longitude,
          latitude: item.location.latitude,
          step: item
            ?.step
              ?.id,
          date: item
            ?.date == null
              ? ""
              : item.date
        }));
      });
      if (
        routeSource.listLocations.length == 0 &&
        data.length > 0 &&
        firstFetch
      )
        setViewport({
          latitude: data[
            data
              ?.length - 1
          ]
            ?.location
              ?.latitude,
          longitude: data[
            data
              ?.length - 1
          ]
            ?.location
              ?.longitude,
          zoom: 7,
          bearing: 0,
          pitch: 0
        });
      setFirstFetch(false);
      setRouteSource(new LayerUtile(lstStep));
    }
  });
}

export function pois(token, id, setPoiSource) {
  return useQuery([
    "poi", id
  ], () => fetchPois(token, id), {
    retry: false,
    onSuccess: data => {
      let lstPoi = [];
      data.map(item => {
        lstPoi.push(new Location({
          id: item.id,
          description: item.description,
          title: item.title,
          longitude: item.location.longitude,
          latitude: item.location.latitude,
          step: item
            ?.step
              ?.id
        }));
      });
      setPoiSource(new LayerUtile(lstPoi));
    }
  });
}

export function locations(token, id, setLocationSource, enabled) {
  return useQuery(
    ["locations", id],
    () => fetchAlbumElementLocations(token, id),
    {
      enabled: enabled,
      retry: false,
      onSuccess: (data) => {
        let locationsList = [];
        data.map((item) => {
          let i = 0;
          let found = false;
          let distance;
          while (i < locationsList.length && !found) {
            distance = distanceInKmBetweenEarthCoordinates(
              item.latitude,
              item.longitude,
              locationsList[i].latitude,
              locationsList[i].longitude,
            );
            i++;
            if (distance < 1) {
              found = true;
            }
          }
          if (found) {
            let location = locationsList[i - 1];
            location.albumElements = location.albumElements.concat(
              item.albumElements,
            );
          } else {
            locationsList.push(
              new Location({
                id: item.id,
                longitude: item.longitude,
                latitude: item.latitude,
                albumElements: item.albumElements,
              }),
            );
          }
        });
        setLocationSource(new LayerUtile(locationsList));
      },
    },
  );
}

export function pictures(token, id, setImageList, enabled) {
  return useQuery([
    "explorePictures", id
  ], () => getPictures(token, id), {
    enabled: enabled,
    onSuccess: data => {
      let formatedList = [];
      data.map(picture => {
        formatedList = [
          ...formatedList, {
            type: "Feature",
            id: picture.id,
            geometry: {
              type: "Point",
              coordinates: [
                picture.id * 2,
                picture.id * 2
              ] //TODO
            }
          }
        ];
      });
      setImageList({type: "FeatureCollection", features: formatedList});
    }
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
  return useQuery([
    "LogBookEntriesByLocations", idLocation
  ], () => getLogBookEntriesByLocation(idLocation), {
    enabled: enabled && idLocation != null
  });
}
