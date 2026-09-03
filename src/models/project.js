export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
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
}
