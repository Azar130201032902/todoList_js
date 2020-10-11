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
    activerItems();
    activerDeleteBtns();
  }

  function displayNotCompleted () {
      todoCountElt.innerText = todoList.querySelectorAll('li:not(.completed)').length;
  }

  function toggleItem (item) {
    item.classList.toggle('completed');
    displayNotCompleted();
  }

  function editItem(item) {
    const value = item.querySelector('label').innerText;
    item.querySelector('label').innerHTML = `<input type="text" value="${value}" class="editInput" />`;
    item.querySelector('label input').focus();
    activerInputs();
  }

  function updateItem(item) {
    item.querySelector('label').innerHTML = item.querySelector('label > input').value;
  }

  function deleteItem(item) {
    item.classList.add('cache');
    setTimeout(function() {
      item.remove();
      displayNotCompleted();
    }, 300);
  }

  function filterItems(filterBtn) {
    const filter = filterBtn.dataset.filter;
   const items = document.querySelectorAll('.listItem');
   for (let item of items) {
     item.matches(filter)?item.classList.remove('cache'):item.classList.add('cache');
   }
  }

  function deleteAllCompleted() {
    const itemsCompleted = document.querySelectorAll('.completed');
    for (let itemCompleted of itemsCompleted) {
      deleteItem(itemCompleted);
    }
  }

// Capture d'event
  newTodo.addEventListener('keyup', function(e) {
    if(e.keyCode == 13 && this.value.length > 0) {
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

  function activerItems() {
    const itemsNotCompleted = todoList.querySelectorAll('.listItem:not(.completed) label');
    for (let itemNotCompleted of itemsNotCompleted) {
      itemNotCompleted.ondblclick = function () {
        editItem(this.closest('li'));
      }
    }
  }

  function activerInputs() {
    const editInputs = document.querySelectorAll('.editInput');
    for (let editInput of editInputs) {
      editInput.onkeyup = function(e) {
        if (e.keyCode === 13) {
          updateItem(this.closest('li'));
        }
      }
      editInput.onblur = function() {
        updateItem(this.closest('li'));
      }
    }
  }

  function activerDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.destroy');
    for (deleteBtn of deleteBtns) {
      deleteBtn.onclick = function () {
        deleteItem(this.closest('li'));
      }
    }
  }

  const filterBtns = document.querySelectorAll('.filter');
  for (filterBtn of filterBtns) {
    filterBtn.onclick = function() {
      filterBtns.forEach(function(filterLink) {
        filterLink.classList.remove('selected');
      });
      this.classList.add('selected');
      filterItems(this);
    }
  }

  document.querySelector('.clear-completed').onclick = function() {
    deleteAllCompleted(this);
  }


// Lancement des fonctions lors du chargement de la page
  displayNotCompleted();
  activerCheckboxes();
  activerItems();
  activerDeleteBtns();

}
