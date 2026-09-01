import "./styles.css";
import Project from "./models/project.js";
import Todo from "./models/todo.js";
import { initialize, selectProject, getProjects, removeProject, addProject, getSelectedProject } from "./app.js";
import { renderProjects, renderProject, renderTodo } from "./display.js";

// add new project button
const newProjectBtn = document.querySelector(".new-project");
newProjectBtn.addEventListener("click", () => {
  addProject(new Project("New Project"));
  renderProjects(getProjects(), getSelectedProject())
})

const projectsList = document.querySelector(".projects");
projectsList.addEventListener("click", (e) => {
  const selectedButton = e.target.closest("[data-project-id]");

  if (!selectedButton) return;

  const selectedProjectId = selectedButton.dataset.projectId;
  selectProject(selectedProjectId);

  renderProjects(getProjects(), getSelectedProject());
  renderProject(getSelectedProject());
})

// const newTodoBtn = document.querySelector(".add-todo");
// newTodoBtn.addEventListener("click", () => {
//   const selectedProject = getSelectedProject();
//   selectedProject.addTodo(
//     new Todo({ title: "New Todo", priority: "High" })
//   );
// })

renderProjects(getProjects(), getSelectedProject());
renderProject(getSelectedProject());
