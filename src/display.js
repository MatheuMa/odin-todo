import editIcon from "./assets/images/edit.png";

const projectList = document.querySelector(".projects ul");

function renderProjects(projects, selectedProject) {
  projectList.replaceChildren();
  projects.forEach(project => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = project.title;
    button.dataset.projectId = project.id;

    if (project.id === selectedProject?.id) {
      button.classList.add("active");
    }

    listItem.appendChild(button);
    projectList.appendChild(listItem);
  })
}

function renderProject(project) {
  const todoListMain = document.querySelector(".todo-list");
  todoListMain.replaceChildren();

  if (!project) {
    const noProject = document.createElement("h1");
    noProject.classList.add("no-project");
    noProject.textContent = "Please select or create a project!"
    todoListMain.appendChild(noProject);
    return;
  };

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("todo-title");
  const titleInsideDiv = document.createElement("div");
  const projectHeader = document.createElement("h1");
  projectHeader.textContent = project.title;
  const editBtn = document.createElement("button");
  const editBtnImg = document.createElement("img");
  editBtnImg.classList.add("edit-project");
  editBtnImg.src = editIcon;
  editBtnImg.alt = "edit project name";
  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("add-todo");
  addTodoBtn.textContent = "+ New Todo";

  const todoMeta = document.createElement("div");
  todoMeta.classList.add("todo-meta");
  const todoAll = document.createElement("div");
  todoAll.classList.add("todo-all");
  const todoAllCheckbox = document.createElement("input");
  todoAllCheckbox.type = "checkbox";
  todoAllCheckbox.classList.add("todo-checkbox");
  todoAllCheckbox.id = "todo-checkbox";
  const todoAllLabel = document.createElement("label");
  todoAllLabel.htmlFor = "todo-checkbox";
  todoAllLabel.textContent = "Todo";
  todoAll.append(todoAllCheckbox, todoAllLabel);

  const dueDateSort = document.createElement("button");
  dueDateSort.textContent = "Due Date";
  dueDateSort.classList.add("sort-due-date");
  const prioritySort = document.createElement("button");
  prioritySort.textContent = "Priority";
  prioritySort.classList.add("sort-priority");
  todoMeta.append(todoAll, dueDateSort, prioritySort)

  editBtn.appendChild(editBtnImg);
  titleInsideDiv.append(projectHeader, editBtn)
  titleDiv.append(titleInsideDiv, addTodoBtn);
  todoListMain.append(titleDiv, todoMeta)

  const todoItems = document.createElement("div");
  todoItems.classList.add("todo-items");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-project");
  deleteBtn.textContent = "Delete Project";

  const todos = project.getTodos();

  if (todos.length === 0) {
    const nothing = document.createElement("h1");
    nothing.style.margin = "50px"
    nothing.textContent = "No thing todo!!"
    todoItems.appendChild(nothing);
  }

  const todoList = document.createElement("ul");

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoDiv = document.createElement("div");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("todo-checkbox");
    todoCheckbox.id = `todo-item-${todo.id}`

    const todoLabel = document.createElement("label");
    todoLabel.htmlFor = `todo-item-${todo.id}`;
    todoLabel.textContent = todo.title;
    todoDiv.append(todoCheckbox, todoLabel);

    const due = document.createElement("p");
    due.textContent = todo.dueDate || "-";

    const priorityDiv = document.createElement("div");
    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("priority");
    prioritySpan.classList.add(`priority-${todo.priority}`);
    prioritySpan.textContent = todo.priority;
    priorityDiv.appendChild(prioritySpan);

    todoList.appendChild(todoItem);
    todoItem.append(todoDiv, due, priorityDiv);
  });

  todoItems.append(todoList)
  todoListMain.append(todoItems, deleteBtn);
}

function renderTodo(todo) {

}

export { renderProjects, renderProject, renderTodo }
