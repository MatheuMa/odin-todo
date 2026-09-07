import Project from "./models/project.js";
import Todo from "./models/todo.js";
import { loadLocalProjects, saveProjectsToLocal } from "./storage.js";

let projects = [];
let selectedProject = null;
let selectedTodo = null;

function initialize() {
  const testProjectList = [
    new Project("Test Project 1"),
    new Project("Test Project 2"),
    new Project("Test Project 3"),
  ];

  testProjectList[0].addTodo(
    new Todo({
      title: "Review Calculus notes",
      description: "test project 1 - todo - 1 - description",
      priority: "high",
      notes: "test project 1 - todo - 1 - notes",
    }),
  );

  testProjectList[0].addTodo(
    new Todo({
      title: "Read Chapter 6: Probability",
      description: "test project 1 - todo - 2 - description",
      dueDate: "2026-05-24",
      priority: "medium",
      notes: "test project 1 - todo - 2 - notes",
    }),
  );

  testProjectList[0].addTodo(
    new Todo({
      title: "Do Laundry",
      description: "test project 1 - todo - 3 - description",
      dueDate: "2026-05-28",
      priority: "low",
      notes: "test project 1 - todo - 3 - notes",
    }),
  );

  testProjectList[1].addTodo(
    new Todo({
      title: "Complete Linear Algebra problem set",
      description: "test project 2 - todo - 1 - description",
      dueDate: "2026-05-22",
      priority: "high",
      notes: "test project 2 - todo - 1 - notes",
    }),
  );

  testProjectList[1].addTodo(
    new Todo({
      title: "Watch Lecture 14: Hypothesis Testing",
      description: "test project 2 - todo - 2 - description",
      dueDate: "2026-05-24",
      priority: "medium",
      notes: "test project 2 - todo - 2 - notes",
    }),
  );

  testProjectList[1].addTodo(
    new Todo({
      title: "Prepare study plan for next week",
      description: "test project 2 - todo - 3 - description",
      dueDate: "2026-05-28",
      priority: "low",
      notes: "test project 2 - todo - 3 - notes",
    }),
  );

  testProjectList[1].addTodo(
    new Todo({
      title: "Prepare for open home",
      description: "test project 2 - todo - 4 - description",
      dueDate: "2026-06-22",
      priority: "low",
      notes: "test project 2 - todo - 4 - notes",
    }),
  );

  testProjectList[1].addTodo(
    new Todo({
      title: "Find a way to stay",
      description: "test project 2 - todo - 5 - description",
      dueDate: "2024-06-22",
      priority: "high",
      notes: "test project 2 - todo - 5 - notes",
    }),
  );

  // get projects from localStorage and put in projects
  const savedProjects = loadLocalProjects();

  if (!savedProjects) {
    projects = testProjectList;
    saveProjectsToLocal(projects);
    console.log("no local storage, a new local storage is created")
  } else {
    projects = savedProjects;
    console.log('local storage loaded')
  }
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
