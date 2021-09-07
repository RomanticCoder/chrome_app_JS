const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";
let toDos = [];

function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function filterFn(toDo){
    return toDo.id === 1; 
}

function deleteToDo(event){
    toDos.forEach((todo) => console.log(todo.id));
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(((toDo) => toDo.id !== parseInt(li.id)));
    toDos = (cleanToDos);
    saveToDos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length +1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;
    toDoList.appendChild(li);

    const toDoObj = {
        text,
        id: newID,
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos){ //there is to do list in local storage
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((toDo)=>{
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();