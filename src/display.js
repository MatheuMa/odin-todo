import editIcon from "./assets/images/edit.png";
import closeIcon from "./assets/images/close.png";

const projectList = document.querySelector(".projects ul");
const todoListMain = document.querySelector(".todo-list");
const todoDetail = document.querySelector(".todo-detail");

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
  });
}

function renderProject(project) {
  todoListMain.replaceChildren();

  if (!project) {
    const noProject = document.createElement("h1");
    noProject.classList.add("no-project");
    noProject.textContent = "Please select or create a project!";
    todoListMain.appendChild(noProject);
    return;
  }

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("todo-title");
  const titleInsideDiv = document.createElement("div");
  const projectHeader = document.createElement("h1");
  projectHeader.textContent = project.title;
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-project-button");
  editBtn.dataset.action = "rename-project";
  const editBtnImg = document.createElement("img");
  editBtnImg.classList.add("edit-project");
  editBtnImg.src = editIcon;
  editBtnImg.alt = "edit project name";
  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("add-todo");
  addTodoBtn.dataset.action = "add-todo";
  addTodoBtn.textContent = "+ New Todo";

  const todoMeta = document.createElement("div");
  todoMeta.classList.add("todo-meta");
  const todoAll = document.createElement("div");
  todoAll.classList.add("todo-all");

  const todoAllLabel = document.createElement("label");
  todoAllLabel.htmlFor = "todo-checkbox";
  todoAllLabel.textContent = "Todo";
  todoAll.append(todoAllLabel);

  const dueDateSort = document.createElement("button");
  dueDateSort.textContent = "Due Date";
  dueDateSort.classList.add("sort-due-date");
  const prioritySort = document.createElement("button");
  prioritySort.textContent = "Priority";
  prioritySort.classList.add("sort-priority");
  todoMeta.append(todoAll, dueDateSort, prioritySort);

  editBtn.appendChild(editBtnImg);
  titleInsideDiv.append(projectHeader, editBtn);
  titleDiv.append(titleInsideDiv, addTodoBtn);
  todoListMain.append(titleDiv, todoMeta);

  const todoItems = document.createElement("div");
  todoItems.classList.add("todo-items");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-project");
  deleteBtn.dataset.action = "delete-project";
  deleteBtn.textContent = "Delete Project";

  const todos = project.getTodos();

  if (todos.length === 0) {
    const nothing = document.createElement("h1");
    nothing.style.margin = "50px";
    nothing.textContent = "Nothing to do!";
    todoItems.appendChild(nothing);
  }

  const todoList = document.createElement("ul");

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.dataset.todoId = todo.id;
    const todoDiv = document.createElement("div");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("todo-checkbox");
    todoCheckbox.id = `todo-item-${todo.id}`;

    if (todo.completed) {
      todoItem.classList.add("completed");
      todoCheckbox.checked = true;
    }

    const todoTitle = document.createElement("span");
    todoTitle.textContent = todo.title;
    todoDiv.append(todoCheckbox, todoTitle);

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

  todoItems.append(todoList);
  todoListMain.append(todoItems, deleteBtn);
}

function renderTodo(selectedTodo) {
  const details = selectedTodo.todoDetails;
  todoDetail.replaceChildren();

  const detailHeader = document.createElement("div");
  detailHeader.classList.add("detail-header");
  const detailTitle = document.createElement("h2");
  detailTitle.textContent = "Todo Details";
  const closeBtn = document.createElement("button");
  const closeBtnImg = document.createElement("img");
  closeBtnImg.src = closeIcon;
  closeBtnImg.alt = "close button";
  closeBtn.dataset.action = "close";
  closeBtn.appendChild(closeBtnImg);
  detailHeader.append(detailTitle, closeBtn);

  const todoForm = document.createElement("form");
  todoForm.classList.add("todo-form");

  const titleDiv = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "todo-title";
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "todo-title";
  titleInput.name = "todo-title";
  titleInput.value = details.title;
  titleInput.required = true;
  titleDiv.append(titleLabel, titleInput);

  const descriptionDiv = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.htmlFor = "todo-description";
  descriptionLabel.textContent = "Description";
  const descriptionTextArea = document.createElement("textarea");
  descriptionTextArea.id = "todo-description";
  descriptionTextArea.name = "todo-description";
  descriptionTextArea.value = details.description;
  descriptionDiv.append(descriptionLabel, descriptionTextArea);

  const dueDiv = document.createElement("div");
  const dueLabel = document.createElement("label");
  dueLabel.htmlFor = "todo-due";
  dueLabel.textContent = "Due Date";
  const dueInput = document.createElement("input");
  dueInput.type = "date";
  dueInput.id = "todo-due";
  dueInput.name = "todo-due-date";
  dueInput.value = details.dueDate;
  dueDiv.append(dueLabel, dueInput);

  const priorityDiv = document.createElement("div");
  const priorityLabel = document.createElement("label");
  priorityLabel.htmlFor = "todo-priority";
  priorityLabel.textContent = "Priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "todo-priority";
  prioritySelect.id = "todo-priority";
  prioritySelect.required = true;
  const optionHigh = document.createElement("option");
  optionHigh.textContent = "high";
  optionHigh.value = "high";
  const optionMedium = document.createElement("option");
  optionMedium.textContent = "medium";
  optionMedium.value = "medium";
  const optionLow = document.createElement("option");
  optionLow.textContent = "low";
  optionLow.value = "low";
  prioritySelect.append(optionHigh, optionMedium, optionLow);
  prioritySelect.value = details.priority;
  priorityDiv.append(priorityLabel, prioritySelect);

  const notesDiv = document.createElement("div");
  const notesLabel = document.createElement("label");
  notesLabel.htmlFor = "todo-notes";
  notesLabel.textContent = "Notes";
  const notesTextarea = document.createElement("textarea");
  notesTextarea.name = "todo-notes";
  notesTextarea.id = "todo-notes";
  notesTextarea.value = details.notes;
  notesDiv.append(notesLabel, notesTextarea);

  const todoBtnsDiv = document.createElement("div");
  todoBtnsDiv.classList.add("todo-btns");
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Save Changes";
  saveBtn.dataset.action = "save";
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  const deleteSpan = document.createElement("span");
  deleteSpan.textContent = "Delete";
  deleteBtn.dataset.action = "delete";

  deleteBtn.appendChild(deleteSpan);
  todoBtnsDiv.append(saveBtn, deleteBtn);

  todoForm.append(titleDiv, descriptionDiv, dueDiv, priorityDiv, notesDiv, todoBtnsDiv);
  todoDetail.append(detailHeader, todoForm);
}

export { renderProjects, renderProject, renderTodo };
