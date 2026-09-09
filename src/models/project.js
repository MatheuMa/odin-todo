import Todo from "./todo.js";

const priorityRule = ["high", "medium", "low"];

export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.prioritySortFlag = 1;
    this.dueDateSortFlag = 1;
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  findTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  rename(newTitle) {
    this.title = newTitle;
  }

  togglePriorityFlag() {
    this.prioritySortFlag = -this.prioritySortFlag;
  }

  toggleDueDateFlag() {
    this.dueDateSortFlag = -this.dueDateSortFlag;
  }

  sortByPriority() {
    this.todos.sort((a, b) => {
      const priorityA = priorityRule.indexOf(a.priority);
      const priorityB = priorityRule.indexOf(b.priority);

      if (priorityA === priorityB) {
        return compareDates(a, b);
      } else {
        return (priorityA - priorityB) * this.prioritySortFlag;
      }
    });
  }

  sortByDueDate() {
    return this.todos.sort((a, b) => {
      return compareDates(a, b) * this.dueDateSortFlag;
    });
  }

  static fromJSON(data) {
    const project = new Project(data.title);

    project.id = data.id;
    project.todos = data.todos.map((todoData) => {
      return Todo.fromJSON(todoData);
    });

    return project;
  }
}

function compareDates(a, b) {
  if (!a.dueDate && !b.dueDate) {
    return a.title.localeCompare(b.title);
  }

  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;

  if (a.dueDate === b.dueDate) {
    return a.title.localeCompare(b.title);
  } else {
    return a.dueDate.localeCompare(b.dueDate);
  }
}
