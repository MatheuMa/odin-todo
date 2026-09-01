function renderProjects(projects) {
  console.log("Projects:");

  projects.forEach((project) => {
    console.log(`- ${project.title} (${project.todos.length} todos)`)
  });
}

function renderProject(project) {
  console.log(`Selected project: ${project.title}`);

  if (project.todos.length === 0) {
    console.log("No todos");
    return;
  }

  project.todos.forEach((todo) => {
    console.log(`${todo.title} | ${todo.dueDate} | ${todo.priority}`);
  })
}

function renderTodo(todo) {
  console.log(todo.todoDetails);
}

export { renderProjects, renderProject, renderTodo }
