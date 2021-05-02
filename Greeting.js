const nameForm = document.querySelector(".js-nameForm"),
    nameInput = nameForm.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

function saveName() {
    localStorage.setItem("userName", nameInput.value);
}

function handleSubmit(event) {
    event.preventDefault();
    saveName();
    fGreeting(nameInput.value)
    nameInput.value = "";
}

function fGreeting(text) {
    greeting.innerText = `Hello! ${text}!`;
    nameForm.classList.add("hide");
}

function paintGreeting () {
    const currentUser = localStorage.getItem("userName");
    if (currentUser !== null) {
        fGreeting(currentUser);
    } else {
    }
}

function init() {
    paintGreeting();
    nameForm.addEventListener("submit", handleSubmit);
}

init();