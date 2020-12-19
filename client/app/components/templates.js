export const generateFilterButtonTemplate = ({ id, filterName, text }) => `
    <div class='grid__item'>
      <button
        class='button button--${filterName}'
        data-id='${id}'
        data-filter='${filterName}'
      >
        ${text}
      </button>
    </div>
  `;

export const generateTodoActionsTemplate = (item) => {
  const { id, status } = item;

  const notDoneButton =
    status !== 'not-done'
      ? generateFilterButtonTemplate({
        id,
        filterName: 'not-done',
        text: 'N',
      })
      : '';

  const pendingButton =
    status !== 'pending'
      ? generateFilterButtonTemplate({
        id,
        filterName: 'pending',
        text: 'P',
      })
      : '';

  const doneButton =
    status !== 'done'
      ? generateFilterButtonTemplate({ id, filterName: 'done', text: 'D' })
      : '';

  const removeButton = `<div class='button--remove' data-id='${id}'><i></i></div>`;

  return `
    <div class='todo-item__actions'>
      <div class='grid'>
        ${notDoneButton}
        ${pendingButton}
        ${doneButton}
        ${removeButton}
      </div>
    </div>
  `;
};

export const generateTodoItemsTemplate = (arr) => arr.reduce((acc, item) => {
  const todoActionsTemplate = generateTodoActionsTemplate(item);

  return (
    `${acc
    }
      <div class='todo-list__item'>
        <div class='todo-item'>
          <div class='grid'>
            <div class='grid__item grid__item--grow'>
              <div class='todo-item__text'>${item.text}</div>
            </div>
            <div class='grid__item grid__item--shrink'>
              ${todoActionsTemplate}
            </div>
          </div>
        </div>
      </div>
    `
  );
}, '');

export const getFiltersTemplate = (currentFilter) => {
  const filters = [
    { value: 'not-done', text: 'Not Done' },
    { value: 'pending', text: 'Pending' },
    { value: 'done', text: 'Done' },
    { value: 'all', text: 'All' },
  ];

  const elements = filters.map((item) => {
    const classes = ['tab', `tab--${item.value}`];

    if (item.value === currentFilter) {
      classes.push('tab--active');
    }

    return `
      <div class='grid__item'>
        <div class='${classes.join(' ')}' data-filter='${item.value}'>
          <span>${item.text}</span>
        </div>
      </div>
    `;
  });

  return elements.join('');
};

export const createFiltersTemplate = (currentFilter) => {
  const todoFilters = document.createElement('div');
  todoFilters.classList.add('todo-filters');

  const template = `
    <div class='section'>
      <div class='section__body'>
        <div class='grid'>
          ${getFiltersTemplate(currentFilter)}
        </div>
      </div>
    </div>
  `;

  todoFilters.innerHTML = template;

  return todoFilters;
};

export const createDefaultMessageTemplate = () => {
  const defaultMessageTemplate = `
    <div class="default-message-container">
      <span class="default-message">No items in this section</span>
    </div>
  `;
  return defaultMessageTemplate;
};

export const createTodoHeaderTemplate = () => {
  const todoHeader = document.createElement('div');
  todoHeader.classList.add('todo__header');

  const template = `
    <div class='section'>
      <div class='section__header'>
        <span>My todo list</span>
      </div>
      <div class='section__body'>
        <div class="grid">
          <div class='grid__item'>
            <input class="input" type="text" placeholder="Todo..." />
          </div>
          <div class='grid__item'>
            <button class="button button--create">Create</button>
          </div>
        </div>
      </div>
    </div>
  `;

  todoHeader.innerHTML = template;

  return todoHeader;
};

export const getFilteredTodos = (currentFilter, currentTodos) => {
  if (currentFilter === 'all') {
    return currentTodos;
  }

  return currentTodos.filter((todo) => todo.status === currentFilter);
};

export const generateTodosTemplate = (currentFilter, currentTodos) => {
  const newTodos = getFilteredTodos(currentFilter, currentTodos);

  return newTodos.length === 0
    ? createDefaultMessageTemplate()
    : generateTodoItemsTemplate(newTodos);
};
