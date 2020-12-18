export const createTodo = () => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  return todo;
};

export const createToDoList = (template) => {
  const todoList = document.createElement('div');
  todoList.classList.add('todo-list');
  todoList.innerHTML = template;

  return todoList;
};
