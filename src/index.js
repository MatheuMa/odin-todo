import "./styles.css";
import Project from "./models/project.js";
import Todo from "./models/todo.js";
import {
  selectProject,
  getProjects,
  removeProject,
  addProject,
  getSelectedProject,
  selectTodo,
  getSelectedTodo,
  clearSelectedTodo,
} from "./app.js";
import { renderProjects, renderProject, renderTodo } from "./display.js";

const application = document.querySelector(".app");
const newProjectButton = document.querySelector(".new-project");
const projectsList = document.querySelector(".projects");
const todoList = document.querySelector(".todo-list");
const todoDetail = document.querySelector(".todo-detail");

// Event for + New Project
newProjectButton.addEventListener("click", () => {
  addProject(new Project("New Project"));
  renderProjects(getProjects(), getSelectedProject());
});

// Event for selecting a Project
projectsList.addEventListener("click", (event) => {
  const selectedButton = event.target.closest("[data-project-id]");

  if (!selectedButton) return;

  selectProject(selectedButton.dataset.projectId);
  application.classList.remove("todo-selected");
  renderProjects(getProjects(), getSelectedProject());
  renderProject(getSelectedProject());
});

// Events for actions inside the Todo list
todoList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const action = button.dataset.action;
  const selectedProject = getSelectedProject();

  if (action === "add-todo") {
    if (!selectedProject) return;

    selectedProject.addTodo(
      new Todo({ title: "New Todo (Please Rename)", priority: "high" }),
    );
    renderProject(selectedProject);
  } else if (action === "delete-project") {
    if (!selectedProject) return;

    removeProject(selectedProject.id);
    application.classList.remove("todo-selected");
    renderProjects(getProjects(), getSelectedProject());
    renderProject(getSelectedProject());
  }
});

// Event for toggling a Todo's completed state
todoList.addEventListener("click", (event) => {
  const checkbox = event.target.closest(".todo-checkbox");
  const currentProject = getSelectedProject();

  if (!checkbox || !currentProject) return;

  const todoItem = checkbox.closest("[data-todo-id]");

  if (!todoItem) return;

  const todo = currentProject.findTodo(todoItem.dataset.todoId);

  if (!todo) return;

  todo.toggleComplete();
  renderProject(currentProject);
});

// Event for selecting a Todo
todoList.addEventListener("click", (event) => {
  if (event.target.closest(".todo-checkbox")) return;

  const todoItem = event.target.closest("[data-todo-id]");

  if (!todoItem) return;

  selectTodo(getSelectedProject(), todoItem.dataset.todoId);
  application.classList.add("todo-selected");
  renderTodo(getSelectedTodo());
});

// Events for Close and Delete buttons in Todo Details
todoDetail.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const action = button.dataset.action;

  if (action === "close") {
    application.classList.remove("todo-selected");
    clearSelectedTodo();
  } else if (action === "delete") {
    const currentProject = getSelectedProject();
    const currentTodo = getSelectedTodo();

    if (!currentProject || !currentTodo) return;

    currentProject.removeTodo(currentTodo.id);
    clearSelectedTodo();
    application.classList.remove("todo-selected");
    renderProject(currentProject);
  }
});

// Event for saving the Todo Details form
todoDetail.addEventListener("submit", (event) => {
  const form = event.target.closest(".todo-form");

  if (!form) return;

  event.preventDefault();

  const currentProject = getSelectedProject();
  const currentTodo = getSelectedTodo();

  if (!currentProject || !currentTodo) return;

  currentTodo.updateDetails({
    title: form.querySelector("#todo-title").value.trim(),
    description: form.querySelector("#todo-description").value.trim(),
    dueDate: form.querySelector("#todo-due").value,
    priority: form.querySelector("#todo-priority").value,
    notes: form.querySelector("#todo-notes").value.trim(),
  });

  renderProject(currentProject);
  renderTodo(currentTodo);
});

renderProjects(getProjects(), getSelectedProject());
renderProject(getSelectedProject());
