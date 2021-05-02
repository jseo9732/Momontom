const clockH1 = document.querySelector(".js-clock");

function clock() {
    let nowTime = new Date();
    let hour = nowTime.getHours();
    let minutes = nowTime.getMinutes();
    let second = nowTime.getSeconds();
    clockH1.innerText = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${second < 10 ? `0${second}` :  second}`;
}

function init() {
    clock();
    setInterval(clock, 1000);
}

init();