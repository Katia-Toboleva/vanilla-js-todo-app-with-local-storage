import * as Templates from './components/templates';
import * as Elements from './components/elements';
import * as Utilities from './components/utilities';

const app = document.querySelector('#app');

const setLocalStorage = () => {
  localStorage.setItem('todo-state', JSON.stringify(state));
};

const getState = () => {
  const defaultState = {
    input: '',
    todos: [],
    filter: 'not-done',
    currentTodoId: -1,
  };

  const savedState = JSON.parse(localStorage.getItem('todo-state'));

  return savedState || defaultState;
};

const state = getState();

const updateTodos = () => {
  const currentFilter = state.filter;
  const currentTodos = state.todos;
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = Templates.generateTodosTemplate(currentFilter, currentTodos);

  Utilities.addTodoActionEvents(handleTodoButtonClick);
  Utilities.addRemoveButtonsEvents(handleRemoveButtonClick);
};

const addTodo = () => {
  state.todos.push({
    status: state.filter === 'all' ? 'not-done' : state.filter,
    text: state.input,
    id: state.currentTodoId + 1,
  });

  state.currentTodoId += 1;

  setLocalStorage();
  updateTodos();
  Utilities.resetInput(state, setLocalStorage);
};

// Events-------------------------------------
const handleInputKeyUp = (event) => {
  const inputValue = event.target.value;
  state.input = inputValue;

  if (Utilities.isKeyEnter(event) && state.input !== '') {
    addTodo();
  }

  setLocalStorage();
};

const handleEnterButtonCLick = () => {
  if (state.input !== '') {
    addTodo();
  }
};

const handleTodoFiltersItemClick = (event) => {
  const { filter } = event.currentTarget.dataset;
  const todoFiltersItem = [...document.querySelectorAll('.todo-filters .tab')];

  todoFiltersItem.forEach((element) => {
    element.classList.remove('tab--active');
  });

  state.filter = filter;

  event.currentTarget.classList.add('tab--active');

  setLocalStorage();
  updateTodos();
};

const handleTodoButtonClick = (event) => {
  const { filter } = event.currentTarget.dataset;
  const id = Number(event.currentTarget.dataset.id);

  const index = state.todos.findIndex((item) => id === item.id);

  state.todos[index].status = filter;

  setLocalStorage();
  updateTodos();
};

const handleRemoveButtonClick = (event) => {
  const id = Number(event.currentTarget.dataset.id);
  const index = state.todos.findIndex((item) => item.id === id);

  state.todos.splice(index, 1);

  setLocalStorage();
  updateTodos();
};

// render ------------------------------------
const render = () => {
  const todo = Elements.createTodo();
  const currentFilter = state.filter;
  const currentTodos = state.todos;
  const template = Templates.generateTodosTemplate(currentFilter, currentTodos);

  [
    Templates.createTodoHeaderTemplate(),
    Templates.createFiltersTemplate(currentFilter),
    Elements.createToDoList(template),
  ].forEach((item) => {
    todo.appendChild(item);
  });

  app.appendChild(todo);

  Utilities.addEvents({
    handleTodoFiltersItemClick,
    handleInputKeyUp,
    handleEnterButtonCLick,
    handleTodoButtonClick,
    handleRemoveButtonClick,
  });
};

export default render;
