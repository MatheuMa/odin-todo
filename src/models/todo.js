export default class Todo {
  constructor({
    title,
    description = "",
    dueDate,
    priority,
    notes = "",
  }) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false;
  }

  get todoDetails() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      completed: this.completed,
    };
  }

  updateDetails(changes) {
    Object.assign(this, changes);
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
