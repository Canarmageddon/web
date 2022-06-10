import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchPois, fetchSteps, getPictures } from "../../apiCaller";
import LayerUtile from "../../factory/layers/LayerUtile";
import Location from "../../factory/layers/Location";

export function steps(token, id, setRouteSource, setViewport) {
  return useQuery(["steps", id], () => fetchSteps(token, id), {
    retry: false,
    onSuccess: (data) => {
      let lstStep = [];
      data.map((item) => {
        lstStep.push(
          new Location(
            item.id,
            item.description,
            item.title,
            item.location.longitude,
            item.location.latitude,
            item?.step?.id,
          ),
        );
      });
      setRouteSource(new LayerUtile(lstStep));
      setViewport({
        latitude: data[data.length - 1].location.latitude,
        longitude: data[data.length - 1].location.longitude,
        zoom: 7,
        bearing: 0,
        pitch: 0,
      });
    },
  });
}

export function pois(token, id, setPoiSource) {
  return useQuery(["poi", id], () => fetchPois(token, id), {
    retry: false,
    onSuccess: (data) => {
      "here";
      let lstPoi = [];
      data.map((item) => {
        lstPoi.push(
          new Location(
            item.id,
            item.description,
            item.title,
            item.location.longitude,
            item.location.latitude,
            item?.step?.id,
          ),
        );
      });
      setPoiSource(new LayerUtile(lstPoi));
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
