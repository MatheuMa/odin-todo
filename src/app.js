let projects = [];

function initialize() {
  // get projects from localStorage and put in projects
}

// keep "projects" original copy from being accessed
function getProjects() {
  return [...projects];
}

function removeProject(id) {
  projects = projects.filter((todo) => { return todo.id !== id });
  return [...projects];
}

function addProject(project) {
  projects.push(project);
}

export { initialize, getProjects, removeProject, addProject }
