import testProjects from "./testProjects.js";

let projects = testProjects();
let selectedProject;
let selectedTodo;

function initialize() {
  // get projects from localStorage and put in projects
}

function selectProject(id) {
  selectedProject = projects.find(project => (project.id === id));
}

function getSelectedProject() {
  return selectedProject;
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

function selectTodo(selectedProject, id) {
  selectedTodo = selectedProject.findTodo(id);
}

function getSelectedTodo() {
  return selectedTodo;
}

export { initialize, getSelectedProject, selectProject, getProjects, removeProject, addProject }
