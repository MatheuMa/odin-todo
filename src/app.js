import testProjects from "./testProjects.js";

let projects = testProjects();
let selectedProject;
let selectedTodo;

function initialize() {
  // get projects from localStorage and put in projects
}

function selectProject(id) {
  selectedProject = projects.find((project) => project.id === id) ?? null;
  selectedTodo = null;
}

function getSelectedProject() {
  return selectedProject;
}

// keep "projects" original copy from being accessed
function getProjects() {
  return [...projects];
}

function removeProject(id) {
  projects = projects.filter((project) => project.id !== id);

  if (selectedProject?.id === id) {
    selectedProject = null;
    selectedTodo = null;
  }
}

function addProject(project) {
  projects.push(project);
}

function selectTodo(selectedProject, id) {
  selectedTodo = selectedProject?.findTodo(id) ?? null;
}

function getSelectedTodo() {
  return selectedTodo;
}

function clearSelectedProject() {
  selectedProject = null;
  selectedTodo = null;
}

function clearSelectedTodo() {
  selectedTodo = null;
}

export {
  initialize,
  getSelectedProject,
  selectProject,
  selectTodo,
  getSelectedTodo,
  getProjects,
  removeProject,
  addProject,
  clearSelectedProject,
  clearSelectedTodo,
};
