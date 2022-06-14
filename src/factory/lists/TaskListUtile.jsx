export default class TaskListUtile {
    listTasks = [];
    constructor(id, name, listTasks = []) {
        this.id = id;
        this.name = name;
        this.listTasks = listTasks;
    }

    get items() {
        return [...this.listTasks];
    }

    setName(name) {
        return new TaskListUtile(this.id, name, this.listTasks);
    }

    addTask(task) {
        return new TaskListUtile(this.id, this.name, [...this.listTasks, task]);
    }

    getTaskById(id) {
        for (let i = 0; i < this.listTasks.length; i++) {
            if (this.listTasks[i].id === id)
                return this.listTasks[i];
        }
        return null;
    }

    removeTask(id) {
        return new TaskListUtile(this.id, this.name, [...this.listTasks.filter(elt => elt.id != id)]);
    }

    updateItem(item) {
        return new TaskListUtile(this.id, this.name, [
            ...this.listTasks.filter(elt => elt.id != item.id),
            item
        ]);
    }
}
