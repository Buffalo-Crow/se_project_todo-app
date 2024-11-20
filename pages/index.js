import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupwithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopupWithForm = new PopupwithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (input) => {
    const name = input.name;
    const dateInput = input.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    renderTodo(values);
    todoCounter.updateTotal(true);
    addTodoPopupWithForm.close();
  },
});

addTodoPopupWithForm.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateCompleted(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleUpdate() {
  todoCounter.updateTotal(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleUpdate
  );
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

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
