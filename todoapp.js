const input = document.querySelector("#new-todo-title");
const todo = document.querySelector("#todo-list");
const count = document.querySelector(".todo-count strong");

let todoList = [];

// keyboard down > add task to list
document.addEventListener("keydown",handleKeyDown);

function handleKeyDown(event){
    if(event.code == 'Enter' ){
        const title = input.value;
        if(!title || title === '')
            return;
        addTask(title);
    }

    if(event.code == 'Escape'){
        const lis = todo.querySelectorAll("li");
        lis.forEach((li) => li.classList.remove("editing"));
    }

}

function addTask(title){
    appendHTMLElement(title,'active');
    saveLocalStorage();    
    showCount();
    input.value = '';
}

function appendHTMLElement(title, state){
    const id = todoList.length;
    todo.innerHTML += `
    <li id = ${id}>
        <div class="view">
            <input class="toggle" type="checkbox" ${state == 'completed' ? 'checked' : ''} />
            <label class="label">${title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${title} />
    </li>`;

    const todoObj = {
        "id": id,
        "title": title,
        "state": state,
    }
    todoList.push(todoObj);
}

function saveLocalStorage(){
    localStorage.setItem('todo',JSON.stringify(todoList));
}


loadLocalStorage();
function loadLocalStorage(){
    todoList = [];
    todo.innerHTML ='';
    const loadedList = localStorage.getItem('todo');
    if(!loadedList){
        return;
    }
    const parsedList = JSON.parse(loadedList);
    for(let element of parsedList){
        if(!element) return;
        appendHTMLElement(element.title, element.state);
    }
    showCount();
}

todo.addEventListener("click",handleTodoClick);

function handleTodoClick(event){
    const target = event.target;
    if(target.nodeName == 'BUTTON'){
        deleteElement(target)
    }
    if(target.type == 'checkbox'){
        const li = (target.parentNode.parentNode);
        li.classList.toggle("completed");
        console.log(li);
        todoList.forEach((element)=>{
            if(element.id == li.id){    
                if(element.state == 'active'){
                    element.state = 'completed';
                }else if(element.state == 'completed'){
                    element.state = 'active';
                }
            }
        });
        saveLocalStorage();
        loadLocalStorage();

    }
}

function deleteElement(target){
    const li = (target.parentNode.parentNode);
    showCount();
    const filteredList = todoList.filter((element)=>(element.id != li.id))
    todoList = filteredList;
    saveLocalStorage();
    loadLocalStorage();
}

// todo list??? ?????????????????? ??? input ????????? ??????. 
//(li tag ??? editing class ??????) 
//??? ?????? ????????? ???????????? ?????? ???????????? esc?????? ????????? ???????????? ?????? ?????? ?????? view ????????? ??????
todo.addEventListener("dblclick", switchToInputMode);
function switchToInputMode(event){
    const target = event.target;
    const li = (target.parentNode.parentNode);
    li.classList.add("editing");
}

// show total counts
showCount();
function showCount(){
    count.textContent = todo.children.length;
}

// todo list??? ???????????? ????????????, ????????? ??????, ????????? ?????? ???????????? 
//?????? ????????? ???????????? ????????????
const filters =  document.querySelector(".filters");

filters.addEventListener("click",showFilteredList);

function showFilteredList(event){
    const as = filters.querySelectorAll("a");
    as.forEach((a)=>{
        a.classList.remove("selected");
    })
    event.target.classList.add("selected");

    const state = event.target.classList[0];
    let isChecked = state == 'completed' ? true : false;
    const lis = todo.querySelectorAll("li");
    if(state == 'all'){
        lis.forEach((li)=>{
            li.classList.remove('notShowing');
        })
        return;
    }
    lis.forEach((li)=>{
        const input = li.querySelector("input");
        if(input.checked !== isChecked){
            li.classList.add('notShowing');
        }else{
            li.classList.remove('notShowing');
        }
    })
}
