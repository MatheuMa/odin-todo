let projects = [];

function deleteProject(id) {
  projects = projects.filter((project) => project.id !== id);
}

function addProject(project) {
  projects.push(project);
}