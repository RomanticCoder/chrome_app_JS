const nameForm = document.querySelector(".js-name"),
        nameInput = nameForm.querySelector("input"),
        greeting = document.querySelector(".js-greetings");

const USER_LS = 'currentUser';
const SHOWING_CN = "showing";

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}

function saveName(text){
    localStorage.setItem(USER_LS,text);

}

function paintGreeting(text){
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function init(){
    const currentUser = localStorage.getItem(USER_LS);
    if(!currentUser){ //falsy value
        askForName();

    }else{//truthy value
        paintGreeting(currentUser);
    }
}

init();