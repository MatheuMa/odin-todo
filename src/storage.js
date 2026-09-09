import Project from "./models/project.js";

export function loadLocalProjects() {
  const projectsData = localStorage.getItem("projects");

  if (!projectsData) return;

  const projects = JSON.parse(projectsData).map((project) =>
    Project.fromJSON(project),
  );

  return projects;
}

export function saveProjectsToLocal(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
