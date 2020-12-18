export const isKeyEnter = (event) => event.keyCode === 13;

export const resetInput = (state, setLocalStorage) => {
  const input = document.querySelector('.input');

  input.value = '';
  state.input = '';

  setLocalStorage();
};

export const addTodoActionEvents = (handleTodoButtonClick) => {
  const todoButtons = [...document.querySelectorAll('.todo-item button')];

  todoButtons.forEach((button) => {
    button.addEventListener('click', handleTodoButtonClick);
  });
};

export const addRemoveButtonsEvents = (handleRemoveButtonClick) => {
  const removeButtons = [
    ...document.querySelectorAll('.todo-item .button--remove'),
  ];

  removeButtons.forEach((button) => {
    button.addEventListener('click', handleRemoveButtonClick);
  });
};

export const addEvents = (events) => {
  const todoFiltersItem = [...document.querySelectorAll('.todo-filters .tab')];

  todoFiltersItem.forEach((element) => {
    element.addEventListener('click', events.handleTodoFiltersItemClick);
  });

  const input = document.querySelector('.input');
  input.addEventListener('keyup', events.handleInputKeyUp);

  const button = document.querySelector('.button');
  button.addEventListener('click', events.handleEnterButtonCLick);

  addTodoActionEvents(events.handleTodoButtonClick);
  addRemoveButtonsEvents(events.handleRemoveButtonClick);
};
