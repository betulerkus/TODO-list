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
        todoLi.style.border="0px";
        const todoDiv1 = document.createElement("div");
        todoDiv1.textContent=newValue.split(" ---",1);

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
            if (newValue.includes(" ---checked")) {
            todoI2.style.color="#E8E8E8";
            todoI3.style.color="#E8E8E8";
            todoCheck.checked=true;
            todoLi.style.textDecoration="line-through";
            todoLi.style.color="#E8E8E8";
            }
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
        // todosInLocal.push("{todo: \""+newValue+"\", durum: \" unchecked\"}");
        todosInLocal.push(newValue+" ---unchecked");

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
        popupDiv.style.marginTop="20px";

        addForm.appendChild(popupDiv);
        // document.querySelector("#hr").after(popupDiv);

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
            // In UI
            if (e.target.checked==false) {

                unCheckedTodoUI(e.target);
            //IN Local Storage
            const todoText = e.target.parentElement.previousSibling.textContent;
            checkLocalStorage()
            for (let i = 0; i < todosInLocal.length; i++) {
                if (todosInLocal[i].split(" ---",1)==todoText) {
                    todosInLocal[i]= todosInLocal[i].split(" ---",1)+" ---unChecked";
                    localStorage.setItem("todosInLocal",JSON.stringify(todosInLocal));
                    break;
                }
                
            }
        }
        // When Unchecked - Mark as done
        else{
            // In UI
            checkedTodoUI (e.target);
            //IN Local Storage
            const todoText = e.target.parentElement.previousSibling.textContent;
            checkLocalStorage()
            for (let i = 0; i < todosInLocal.length; i++) {
                if (todosInLocal[i].split(" ---",1)==todoText) {
                    todosInLocal[i]= todosInLocal[i].split(" ---",1)+" ---checked";
                    localStorage.setItem("todosInLocal",JSON.stringify(todosInLocal))
                    break;
                }
                
            }
        }


          break;
        case "fa fa-pencil":
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
    let sure = confirm("Are you sure clear all?");
    if (sure) {
        // Clear from LocalStorage 
        localStorage.clear();
        
        //Clear from UI
        while (todoList.childNodes.length>1) {
            todoList.firstElementChild.remove();    
        }
    }
    
}

function checkedTodoUI (e){
    (e.parentElement.parentElement).style.textDecoration = "line-through";
    (e.parentElement.parentElement).style.color = "#E8E8E8";
    (e).style.color="#E8E8E8";
    e.nextSibling.firstChild.style.color="#E8E8E8";
    e.nextSibling.nextSibling.firstChild.style.color="#E8E8E8";
}

function unCheckedTodoUI(e){
    (e.parentElement.parentElement).style.textDecoration="";
    (e.parentElement.parentElement).style.color = "";
    e.style.color="";
    e.nextSibling.firstChild.style.color="";
    e.nextSibling.nextSibling.firstChild.style.color="";
}