import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupwithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopupWithForm = new PopupwithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

addTodoPopupWithForm.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoSectionEl = generateTodo(item);
    todoSection.addItem(todoSectionEl);
  },
  containerSelector: ".todos__list",
});

todoSection.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

//addTodoCloseBtn.addEventListener("click", () => {
// addTodoPopupWithForm.close();
//});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  addTodoPopupWithForm.close();
});

//initialTodos.forEach((item) => {
//  renderTodo(item);
//});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
