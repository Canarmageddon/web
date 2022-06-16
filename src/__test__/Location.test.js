import LayerUtile from "../factory/layers/LayerUtile";
import Location from "../factory/layers/Location";

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
  expect(layer.items.length).toBe(2);
});

test("remove item", () => {
  let poi = new Location(1);
  let layer = new LayerUtile([poi]);
  layer = layer.removeItem(1);
  expect(length).toBe(0);
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

test("get item by id", () => {
  let layer = new LayerUtile();
  let poi = new Location(0);
  layer = layer.addItem(poi);
  let foundPoi = layer.getItemById(0);
  expect(poi).toEqual(foundPoi);
});

test("get item not in list", () => {
  let layer = new LayerUtile();
  let poi = layer.getItemById(1);
  expect(poi).toBe(null);
});

test("get new id when empty", () => {
  let layer = new LayerUtile();
  let newId = layer.newId;
  expect(newId).toBe(1);
});

test("get new id when empty", () => {
  let layer = new LayerUtile();
  layer = layer.addItem(new Location(10));
  let newId = layer.newId;
  expect(newId).toBe(11);
});

test("update item", () => {
  let layer = new LayerUtile([new Location(0, "description")]);
  let newLocation = layer.items[0];
  newLocation.description = "new Description";
  layer = layer.updateItem(newLocation);
  expect(layer.items.length).toBe(1);
  expect(layer.items[0].description).toBe("new Description");
});
