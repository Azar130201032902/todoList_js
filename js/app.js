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
    activerCheckboxes();
  }

  function displayNotCompleted () {
      todoCountElt.innerText = todoList.querySelectorAll('li:not(.completed)').length;
  }

  function toggleItem (item) {
    item.classList.toggle('completed');
    displayNotCompleted();
  }

  newTodo.addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
      addItem(this);
    }
  });

  function activerCheckboxes() {
    const toggleInputs = document.querySelectorAll('.toggle');
    for (let toggleInput of toggleInputs) {
      toggleInput.onclick = function() {
        toggleItem(this.closest('li'));
      }
    }
  }


  displayNotCompleted();
  activerCheckboxes();

}
