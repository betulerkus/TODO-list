const newTodo = document.querySelector("#todoName");
const addButton =document.querySelector("#todoAddButton");
const searchTodo =document.querySelector("#todoSearch");
const clearButton =document.querySelector("#todoClearButton");
const addForm = (document.querySelectorAll(".card-body")[0]).children[0];
const todoList = document.querySelectorAll(".card-body")[1].children[2];
let todosInLocal =[];
runEvents();


function runEvents(){
    
    addForm.addEventListener("submit", addNewTodoFunc); 
    searchTodo.addEventListener("keyup", searchTodoFunc);
    todoList.addEventListener("click",iconsEvent);
    clearButton.addEventListener("click", clearAllFunc);
    document.addEventListener("DOMContentLoaded",getTodosFunc);
};

function getTodosFunc() {
    checkLocalStorage();
    if (todosInLocal != "" && todosInLocal!=null){
        setTodoList(todosInLocal);
    }
}

function setTodoList(todoArray){
    todoArray.forEach(function(todo){
        addTodoUI(todo);
     })
}
function addNewTodoFunc(e) {
    let todoValue= newTodo.value.trim();
    if (todoValue == "" || todoValue==null){
        alertPopUp("alert alert-warning", "Please write a new TO-DO");
    }
    else{
        addTodoUI(todoValue);
        addTodoLocalS(todoValue);
        alertPopUp("alert alert-success", "Successfuly!!!");
    }
    newTodo.value = "";
    e.preventDefault();
}

    // Add to UI
    function addTodoUI(newValue){
        //Create To-Do
        const todoLi= document.createElement("li");
        todoLi.className="list-group-item d-flex justify-content-between";

        const todoDiv1 = document.createElement("div");
        todoDiv1.textContent=newValue;
        
        const todoDiv2 = document.createElement("div");

        const todoCheck =document.createElement("input");
        todoCheck.type="checkbox";
        todoCheck.className="check"

        const todoA2 =document.createElement("a");
        todoA2.href="#";
        todoA2.className="edit-item";
        todoA2.style.marginLeft = "15px";
        
        const todoI2=document.createElement("i");
        todoI2.className="fa fa-pencil";

        const todoA3 =document.createElement("a");
        todoA3.href="#";
        todoA3.className="delete-item";
        todoA3.style.marginLeft = "15px";
        
        const todoI3=document.createElement("i");
        todoI3.className="fa fa-remove";
        
        todoLi.appendChild(todoDiv1);

        todoLi.appendChild(todoDiv2);
        todoDiv2.appendChild(todoCheck);
        todoDiv2.appendChild(todoA2).appendChild(todoI2);
        todoDiv2.appendChild(todoA3).appendChild(todoI3);
        todoList.appendChild(todoLi);
    };

    // Add to Local Storage
    function addTodoLocalS(newValue) {
        checkLocalStorage();
        todosInLocal.push(newValue);
        localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal));
    }

    //Check the LocalStorage
    function checkLocalStorage(){
        if (localStorage.getItem("todosInLocal")===null) {
         todosInLocal=[];
        }
        else{
        todosInLocal = JSON.parse(localStorage.getItem("todosInLocal"));
        }
    }

    //Show Alert Pop-Up
    function alertPopUp(classAlert, textAlert){
        const popupDiv = document.createElement("div");
        popupDiv.className=classAlert;
        popupDiv.role="alert";
        popupDiv.textContent=textAlert;

        document.querySelector("#hr").after(popupDiv);

        setTimeout(function() {
            popupDiv.remove();
        }, 1500);
    }
    

function searchTodoFunc(){
    const keyWord = searchTodo.value;
    checkLocalStorage();
    if (todosInLocal !="" && todosInLocal!= null){
        let findTodoList=[];
        todosInLocal.forEach(function (todo) {
            if (todo.toUpperCase().includes(keyWord.toUpperCase())) {
                findTodoList.push(todo);
            }
        })
        console.log(findTodoList);
        while (todoList.hasChildNodes()) {
            todoList.removeChild(todoList.firstChild)
        }
        setTodoList(findTodoList);
        
    }
}

function iconsEvent(e){
    switch (e.target.className) {
        case "check":
            //  When Checked - Mark as TODO
            if (e.target.parentElement.parentElement.style.textDecoration=="line-through") {
                (e.target.parentElement.parentElement).style.textDecoration="";
                (e.target.parentElement.parentElement).style.color = "";
                (e.target).style.color="";
                e.target.nextSibling.firstChild.style.color="";
                e.target.nextSibling.nextSibling.firstChild.style.color="";
            }
            else{
            // When Unchecked - Mark as done
            (e.target.parentElement.parentElement).style.textDecoration = "line-through";
            (e.target.parentElement.parentElement).style.color = "gray";
            (e.target).style.color="gray";
            e.target.nextSibling.firstChild.style.color="gray";
            e.target.nextSibling.nextSibling.firstChild.style.color="gray";
            }
          break;
        case "fa fa-pencil":
            console.log("Düzenlenecek");
            let target =e.target.parentElement.parentElement.previousSibling;
            let oldText =e.target.parentElement.parentElement.previousSibling.textContent;
            e.target.parentElement.parentElement.previousSibling.textContent = "";

            // Set edit form
            const form = document.createElement("form")
            form.className="editTodoForm";
            const editInput = document.createElement("input");
            editInput.type="text";
            editInput.value = oldText;
            editInput.className = "edit-input";
            const editTodoButton = document.createElement("input");
            editTodoButton.type="submit";
            editTodoButton.value="Save";
            target.appendChild(form);
            form.appendChild(editInput);
            form.appendChild(editTodoButton);

            // edit function
            form.addEventListener("submit", editTodoFunc);
            function editTodoFunc(){
                let newText = editInput.value;
                for (let i = 0; i < todosInLocal.length; i++) {
                    if (todosInLocal[i]==oldText)
                        {todosInLocal[i]=newText;
                        }
                }
                target.textContent=newText;
                localStorage.setItem("todosInLocal", JSON.stringify(todosInLocal));
            }
            
          break;
        case "fa fa-remove":
            //Delete from UI
            e.target.parentElement.parentElement.parentElement.remove();

            //Delete from LocalStorage
            const removeText = e.target.parentElement.parentElement.previousSibling.textContent;
            const todosLocal = JSON.parse(localStorage.getItem("todosInLocal"));
            todosLocal.forEach(function(item, index, object){
                if (item===removeText) {
                    object.splice(index, 1);
                }
            })
            localStorage.setItem("todosInLocal", JSON.stringify(todosLocal));

    }
}

function clearAllFunc(){
    // Clear from Local Storage 
    localStorage.clear();
    
    //Clear All UI
    while (todoList.childNodes.length>1) {
        todoList.firstElementChild.remove();    
    }
}
