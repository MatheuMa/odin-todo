import Project from "./models/project.js";
import Todo from "./models/todo.js";

export default function testProjects() {
  let testProjects = [
    new Project("Test Project 1"), new Project("Test Project 2"), new Project("Test Project 3")
  ];

  testProjects[0].addTodo(new Todo(
    {
      title: "Review Calculus notes",
      description: "test project 1 - todo - 1 - description",
      priority: "high",
      notes: "test project 1 - todo - 1 - notes"
    }
  ));

  testProjects[0].addTodo(new Todo(
    {
      title: "Read Chapter 6: Probability",
      description: "test project 1 - todo - 2 - description",
      dueDate: "2026-05-24",
      priority: "medium",
      notes: "test project 1 - todo - 2 - notes"
    }
  ));

  testProjects[0].addTodo(new Todo(
    {
      title: "Do Laundry",
      description: "test project 1 - todo - 3 - description",
      dueDate: "2026-05-28",
      priority: "low",
      notes: "test project 1 - todo - 3 - notes"
    }
  ));

  testProjects[1].addTodo(new Todo(
    {
      title: "Complete Linear Algebra problem set",
      description: "test project 2 - todo - 1 - description",
      dueDate: "2026-05-22",
      priority: "high",
      notes: "test project 2 - todo - 1 - notes"
    }
  ))

  testProjects[1].addTodo(new Todo(
    {
      title: "Watch Lecture 14: Hypothesis Testing",
      description: "test project 2 - todo - 2 - description",
      dueDate: "2026-05-24",
      priority: "medium",
      notes: "test project 2 - todo - 2 - notes"
    }
  ))

  testProjects[1].addTodo(new Todo(
    {
      title: "Prepare study plan for next week",
      description: "test project 2 - todo - 3 - description",
      dueDate: "2026-05-28",
      priority: "low",
      notes: "test project 2 - todo - 3 - notes"
    }
  ))

  return testProjects;
}