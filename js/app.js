window.onload = function() {

  const newTodo = document.querySelector('.new-todo');
  const todoList = document.querySelector('.todo-list');
  const todoCountElt = document.getElementById('todo-count');


  function addItem(elt) {
    const newLi = document.createElement('li');
    newLi.classList.add('listItem');
    newLi.classList.add('cache');
    newLi.innerHTML = `
      <input class="toggle" type="checkbox" />
      <label>${elt.value}</label>
      <button class="destroy"></button>
    `;
    todoList.insertBefore(newLi, todoList.childNodes[0]);
    setTimeout(function() {
      todoList.childNodes[0].classList.remove('cache');
    });
    elt.value = '';
    displayNotCompleted();
  }

  function displayNotCompleted () {
      todoCountElt.innerText = todoList.querySelectorAll('li:not(.completed)').length;
  }

  newTodo.addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
      addItem(this);
    }
  });

  displayNotCompleted();

}
