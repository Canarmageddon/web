import { render, screen } from "@testing-library/react";
import App from "../App";
import Location from "../mapHandler/layers/Location";
import LayerUtile from "../mapHandler/layers/LayerUtile";

test("test init layer", () => {
  let poi = new Location();
  let layer = new LayerUtile([poi]);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("add poi", () => {
  let layer = new LayerUtile();
  let poi = new Location();
  layer = layer.addItem(poi);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("add poi 2", () => {
  let layer = new LayerUtile();
  let poi = new Location();
  let poi2 = new Location();
  layer = layer.addItem(poi);
  layer = layer.addItem(poi2);
  const lenght = layer.items.length;
  expect(lenght).toBe(2);
});

test("remove poi", () => {
  let poi = new Location();
  let layer = new LayerUtile([poi]);
  layer.removeItem(poi);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("template layer", () => {
  let layer = new LayerUtile();
  let poi = new Location(0);
  let poi2 = new Location(1);
  layer = layer.addItem(poi);
  layer = layer.addItem(poi2);
  const templateData = layer.templateSource;
  expect(Object.keys(templateData).length).toBe(2);
});
