import Task from "../factory/lists/Task";
import TaskListUtil from "../factory/lists/TaskListUtile";

test("test init list", () => {
  let task = new Task();
  let list = new TaskListUtil(1, "list", [task]);
  const lenght = list.items.length;
  expect(lenght).toBe(1);
});

test("update name", () => {
  let list = new TaskListUtil(1, "list");
  list = list.setName("new list");
  expect(list.name).toBe("new list");
});

test("add task", () => {
  let list = new TaskListUtil(1, "list", []);
  let task = new Task();
  list = list.addTask(task);
  const lenght = list.items.length;
  expect(lenght).toBe(1);
});

test("add task 2", () => {
  let list = new TaskListUtil(1, "list", []);
  let task = new Task();
  list = list.addTask(task);
  list = list.addTask(task);
  expect(list.items.length).toBe(2);
});

test("get task by id", () => {
  let list = new TaskListUtil(1, "list", []);
  let task = new Task(1, "hugo");
  let task2 = new Task(2, "enzo");
  list = list.addTask(task);
  list = list.addTask(task2);
  expect(list.getTaskById(1).creator).toBe("hugo");
});

test("remove item", () => {
  let task = new Task();
  let list = new TaskListUtil(1, "list", [task]);
  let lenght = list.removeTask(1);
  expect(length).toBe(0);
});

test("update item", () => {
  let list = new TaskListUtil(0, "list", [new Task(0, "Hugo")]);
  let task = list.items[0];
  task.creator = "Enzo";
  list = list.updateItem(task);
  expect(list.items.length).toBe(1);
  expect(list.items[0].creator).toBe("Enzo");
});
