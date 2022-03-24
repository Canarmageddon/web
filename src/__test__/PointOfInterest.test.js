import { render, screen } from "@testing-library/react";
import App from "../App";
import PointOfInterest from "../mapHandler/layers/PointOfInterest";
import PointOfInterestLayer from "../mapHandler/layers/PointOfInterestLayer";

test("test init layer", () => {
  let poi = new PointOfInterest();
  let layer = new PointOfInterestLayer([poi]);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("add poi", () => {
  let layer = new PointOfInterestLayer();
  let poi = new PointOfInterest();
  layer = layer.addItem(poi);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("add poi 2", () => {
  let layer = new PointOfInterestLayer();
  let poi = new PointOfInterest();
  let poi2 = new PointOfInterest();
  layer = layer.addItem(poi);
  layer = layer.addItem(poi2);
  const lenght = layer.items.length;
  expect(lenght).toBe(2);
});

test("remove poi", () => {
  let poi = new PointOfInterest();
  let layer = new PointOfInterestLayer([poi]);
  layer.removeItem(poi);
  const lenght = layer.items.length;
  expect(lenght).toBe(1);
});

test("template layer", () => {
  let layer = new PointOfInterestLayer();
  let poi = new PointOfInterest(0);
  let poi2 = new PointOfInterest(1);
  layer = layer.addItem(poi);
  layer = layer.addItem(poi2);
  const templateData = layer.templateLayer;
  expect(templateData.length).toBe(2);
});
