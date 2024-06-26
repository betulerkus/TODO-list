const newTodo = document.querySelector("#todoName");
const addButton = document.querySelector("#todoAddButton");
const searchTodo = document.querySelector("#todoSearch");
const clearButton = document.querySelector("#todoClearButton");
const addForm = document.querySelector("#card-body1").children[0];
const todoList = document.querySelector("#card-body2").children[1];
let todosInLocal = [];
runTodoListProject();


function runTodoListProject() {

  addForm.addEventListener("submit", addNewTodoFunc);
  searchTodo.addEventListener("keyup", searchTodoFunc);
  todoList.addEventListener("click", iconsEvent);
  clearButton.addEventListener("click", clearAllFunc);
  document.addEventListener("DOMContentLoaded", getTodosFunc);
};


function getTodosFunc() {
  checkLocalStorage();
  if (todosInLocal != "" && todosInLocal != null) {
    setTodoList(todosInLocal);
  }
}

function setTodoList(todoArray) {
  todoArray.forEach(function (todo) {
    addTodoUI(todo);
  })
}
function addNewTodoFunc(e) {
  let todoValue = newTodo.value.trim();
  if (todoValue == "" || todoValue == null) {
    newTodo.value = "Please write a new TO-DO";
    newTodo.style.color = "red";
    newTodo.readOnly = "True";
    setTimeout(function () {
      newTodo.value = "";
      newTodo.style.color = "";
      newTodo.readOnly = "";
    }, 1500);
  }
  else {
    addTodoUI(todoValue);
    addTodoLocalS(todoValue);

    newTodo.value = "Successfuly!!!";
    newTodo.style.color = "green";
    newTodo.readOnly = "True";
    newTodo.nextSibling.nextSibling.id = "wait"; //Add Botton Break!
    setTimeout(function () {
      newTodo.value = "";
      newTodo.style.color = "";
      newTodo.readOnly = "";
    }, 1500);

  }
  e.preventDefault();
}

const alertDintFind = (alertText, parentElementAlert) => {
  const alertLi = document.createElement("li")
  alertLi.className = "list-group-item d-flex justify-content-between";
  alertLi.style.flexDirection = "row";
  alertLi.style.display = "flex";
  alertLi.style.justifyContent = "space-between";
  alertLi.style.alignItems = "center";
  alertLi.style.paddingBottom = "1rem";
  alertLi.style.paddingTop = "1rem";
  alertLi.style.marginTop = "2rem";

  const alertDiv = document.createElement("div");
  alertDiv.style.flexDirection = "row";
  alertDiv.style.display = "flex";
  alertDiv.style.width = "100%";
  const alertP = document.createElement("p");
  alertP.textContent = alertText;
  parentElementAlert.appendChild(alertLi).appendChild(alertDiv).appendChild(alertP);
  // todoList.appendChild(alertLi).appendChild(alertDiv).appendChild(alertP);
}

// Add to UI
function addTodoUI(newValue) {
  //Create To-Do


  const todoLi = document.createElement("li");
  todoLi.className = "list-group-item d-flex justify-content-between";
  todoLi.style.flexDirection = "row";
  todoLi.style.display = "flex";
  todoLi.style.justifyContent = "space-between";
  todoLi.style.alignItems = "center";
  todoLi.style.paddingBottom = "0.5rem";
  todoLi.style.paddingTop = "0.5rem";
  todoLi.style.marginTop = "1rem";
  todoLi.style.borderBottomWidth = "1px";

  const todoDiv1 = document.createElement("div");
  todoDiv1.style.flexDirection = "row";
  todoDiv1.style.display = "flex";
  todoDiv1.style.width = "90%";
  const todoCheck = document.createElement("input");
  todoCheck.type = "checkbox";
  todoCheck.className = "check"
  todoCheck.style.marginRight = "0.75rem";
  const todoP1 = document.createElement("p");
  todoP1.textContent = newValue.split(" ---", 1);

  const todoDiv2 = document.createElement("div");
  todoDiv2.style.width = "10%";
  todoDiv2.style.flexDirection = "row";
  todoDiv2.style.display = "flex";
  todoDiv2.style.justifyContent = "flex-end";


  const todoI2 = document.createElement("i");
  todoI2.className = "bx bx-pencil";

  const todoI3 = document.createElement("i");
  todoI3.className = "bx bx-trash";
  todoI3.style.marginLeft = "0.75rem";

  if (newValue.includes(" ---checked")) {
    todoCheck.checked = true;
    todoLi.style.textDecoration = "line-through";
    todoLi.style.color = "#E8E8E8";
  }
  todoLi.appendChild(todoDiv1);
  todoLi.appendChild(todoDiv2);
  todoDiv1.appendChild(todoCheck);
  todoDiv1.appendChild(todoP1);
  todoDiv2.appendChild(todoI2);
  todoDiv2.appendChild(todoI3);
  todoList.appendChild(todoLi);
};

// Add to Local Storage
function addTodoLocalS(newValue) {
  checkLocalStorage();
  // todosInLocal.push("{todo: \""+newValue+"\", durum: \" unchecked\"}");
  todosInLocal.push(newValue + " ---unchecked");

  localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal));
}

//Check the LocalStorage
function checkLocalStorage() {
  if (localStorage.getItem("todosInLocal") === null) {
    todosInLocal = [];
  }
  else {
    todosInLocal = JSON.parse(localStorage.getItem("todosInLocal"));
  }
}

function searchTodoFunc() {
  let keyWord = searchTodo.value;
  checkLocalStorage();
  if (todosInLocal != "" && todosInLocal != null) {
    let findTodoList = [];
    todosInLocal.forEach(function (todo) {
      if (todo.toUpperCase().includes(keyWord.toUpperCase())) {
        findTodoList.push(todo);
      }
    })
    while (todoList.hasChildNodes()) {
      todoList.removeChild(todoList.firstChild)
    }

    if (findTodoList == "" || findTodoList == null) {
      let parentElement = todoList;
      alertDintFind("There aren't  TO DO includes \"" + keyWord + "\"", parentElement);
    }
    else {
      setTodoList(findTodoList);
    }
  }
}

function iconsEvent(e) {
  switch (e.target.className) {
    case "check":
      //  When Checked - Mark as TODO
      // In UI
      if (e.target.checked == false) {

        unCheckedTodoUI(e.target);
        //IN Local Storage
        const todoText = e.target.nextSibling.textContent;
        checkLocalStorage()
        for (let i = 0; i < todosInLocal.length; i++) {
          if (todosInLocal[i].split(" ---", 1) == todoText) {
            todosInLocal[i] = todosInLocal[i].split(" ---", 1) + " ---unChecked";
            localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal));
            break;
          }

        }
      }
      // When Unchecked - Mark as done
      else {
        // In UI
        checkedTodoUI(e.target);
        //IN Local Storage
        const todoText = e.target.nextSibling.textContent;
        checkLocalStorage()
        for (let i = 0; i < todosInLocal.length; i++) {
          if (todosInLocal[i].split(" ---", 1) == todoText) {
            todosInLocal[i] = todosInLocal[i].split(" ---", 1) + " ---checked";
            localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal))
            break;
          }

        }
      }


      break;
    case "bx bx-pencil":
      let editIcon = e.target;
      let target = e.target.parentElement.previousSibling;
      let oldText = e.target.parentElement.previousSibling.children[1].textContent;
      target.children[1].style.display = "none"; //oldText display none
      editIcon.style.display = "none"; //edit icon display none

      // Set edit form
      const form = document.createElement("form")
      form.className = "editTodoForm";
      form.style.width = "100%";
      form.style.borderRadius = "0.25rem";
      form.style.justifyContent = "space-between";
      form.style.boxShadow = "1px 0.5px 20px 0.1px #e879f9";
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = oldText;
      editInput.style.padding = "2px";
      editInput.style.width = "85%";
      editInput.style.borderTopLeftRadius = "0.25rem";
      editInput.style.borderBottomLeftRadius = "0.25rem";
      editInput.className = "edit-input";
      const editTodoButton = document.createElement("input");
      editTodoButton.type = "submit";
      editTodoButton.style.padding = "2px";
      editTodoButton.style.backgroundColor = "#e879f9";
      editTodoButton.style.justifyContent = "flex-end";
      editTodoButton.style.width = "15%";
      editTodoButton.style.color = "white";
      editTodoButton.style.borderTopRightRadius = "0.25rem";
      editTodoButton.style.borderBottomRightRadius = "0.25rem";
      editTodoButton.value = "Save";
      target.appendChild(form);
      form.appendChild(editInput);
      form.appendChild(editTodoButton);
      editInput.focus();

      // edit function
      form.addEventListener("submit", editTodoFunc);
      function editTodoFunc(e) {
        checkLocalStorage();
        let newText = editInput.value;
        for (let i = 0; i < todosInLocal.length; i++) {
          if (todosInLocal[i].split(" ---", 1) == oldText) {
            todosInLocal[i] = todosInLocal[i].replace(oldText, newText);
          }
        }
        target.children[1].style.display = "block";
        target.children[1].innerHTML = newText;
        form.style.display = "none";
        editIcon.style.display = "block";
        localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal));
        e.preventDefault();
      }

      break;
    case "bx bx-trash":
      //Delete from UI
      //SUCCESSFUL message
      e.target.parentElement.previousSibling.children[1].textContent = "To Do deleted";
      e.target.parentElement.parentElement.style.backgroundColor = "rgb(134 239 172)";

      setTimeout(() => {
        e.target.parentElement.parentElement.remove();
      }, 1000);


      //Delete from LocalStorage
      const removeText = e.target.parentElement.previousSibling.children[1].textContent;
      const todosLocal = JSON.parse(localStorage.getItem("todosInLocal"));
      todosLocal.forEach(function (item, index, object) {
        if (item.includes(removeText)) {
          object.splice(index, 1);
        }
      })
      localStorage.setItem("todosInLocal", JSON.stringify(todosLocal));

  }
}

function clearAllFunc() {
  let sure = confirm("Are you sure clear all?");
  if (sure) {
    // Clear from LocalStorage 
    localStorage.clear();

    //Clear from UI
    location.reload();
  }
}

function checkedTodoUI(e) {
  (e.parentElement.parentElement).style.textDecoration = "line-through";
  (e.parentElement.parentElement).style.color = "#E8E8E8";
}

function unCheckedTodoUI(e) {
  (e.parentElement.parentElement).style.textDecoration = "";
  (e.parentElement.parentElement).style.color = "";
}

