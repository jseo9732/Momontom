const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

let pendingArray = [];
let finishedArray = [];
let idNum = 1;

function paintFinishedPending(obj) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = obj.text;
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", delPending);
    const pendBtn = document.createElement("button");
    pendBtn.innerHTML = "✅";
    pendBtn.addEventListener("click", finishPending);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(pendBtn);
    li.id = parseInt(obj.id);
    li.text = obj.text;
    pendingList.appendChild(li);
    const pendObj = {
      id: parseInt(obj.id),
      text: obj.text
    };
    pendingArray.push(pendObj);
    savePending(pendingArray);
  }

function pendFinished(event) {
    delFinished(event);
    paintFinishedPending(event.target.parentNode);
}

function delFinished (event) {
    const delLi = event.target.parentNode;
    finishedList.removeChild(delLi);
    const filterFinished = finishedArray.filter(function (finished) {
        return finished.id !== parseInt(delLi.id)
    });
    finishedArray = filterFinished;
    saveFinished(finishedArray);
}

function saveFinished(f) {
    localStorage.setItem("FINISHED", JSON.stringify(f));
}

function paintFinished (obj) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = obj.text;
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", delFinished);
    const pendBtn = document.createElement("button");
    pendBtn.innerHTML = "⏪";
    pendBtn.addEventListener("click", pendFinished);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(pendBtn);
    li.id = parseInt(obj.id);
    li.text = obj.text;
    finishedList.appendChild(li);
    finishedObj = {
        id: parseInt(obj.id),
        text: obj.text
    }
    finishedArray.push(finishedObj);
    saveFinished(finishedArray);
}

function finishPending(event) {
    delPending(event);
    paintFinished(event.target.parentNode);
}

function delPending (event) {
    const delLi = event.target.parentNode;
    pendingList.removeChild(delLi);
    const filterPending = pendingArray.filter(function (pending) {
        return pending.id !== parseInt(delLi.id)
    });
    pendingArray = filterPending;
    savePending(pendingArray);
}

function savePending(p) {
    localStorage.setItem("PENDING", JSON.stringify(p));
}

function paintPending (text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", delPending);
    const finishBtn = document.createElement("button");
    finishBtn.innerHTML = "✅";
    finishBtn.addEventListener("click", finishPending);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    li.id = idNum;
    li.text = text;
    pendingList.appendChild(li);
    pendObj = {
        id: idNum,
        text: text
    }
    pendingArray.push(pendObj);
    idNum += 1;
    savePending(pendingArray);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue =  todoInput.value;
    paintPending(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadedPending = localStorage.getItem("PENDING");
    const loadedFinished = localStorage.getItem("FINISHED");
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function (pending) {
            paintPending(pending.text);
        });
    }
    if (loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (finished) {
            paintFinished(finished);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();