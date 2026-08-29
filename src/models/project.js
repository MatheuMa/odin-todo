export default class Project {
  constructor(title, todos = []) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  rename(newTitle) {
    this.title = newTitle;
  }
}
