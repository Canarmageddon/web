import { useQuery, useMutation, useQueryClient } from "react-query";
import { createStep } from "../../apiCaller";
import Location from "../../factory/layers/Location";
import LayerUtile from "../../factory/layers/LayerUtile";

export function mutateCreateStep(
  routeSource,
  setRouteSource,
  stepSuccess,
  setContentPage,
  setStepId,
  queryClient,
) {
  return useMutation(createStep, {
    onMutate: (data) => {
      setRouteSource(
        routeSource.addItem(
          new Location(data.id, "", "", data.longitude, data.latitude),
        ),
      );
      const oldData = queryClient.getQueryData(["steps", id]);
      queryClient.setQueryData(["steps", id], (old) => [
        ...old,
        {
          location: { longitude: data.longitude, latitude: data.latitude },
          id: routeSource.newId,
        },
      ]);
      return { oldData };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["steps", id]);
      stepSuccess();
      setContentPage("stepInfo");
      setStepId(data.id);
    },
  });
}
