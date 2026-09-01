export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id
    })
  }

  rename(newTitle) {
    this.title = newTitle;
  }
}
