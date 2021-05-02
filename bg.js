const body = document.querySelector("body");
const IMG_NUM = 5;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage")
    body.appendChild(image);
}

function makeRan () {
    const ranNUM = Math.floor(Math.random() * IMG_NUM);
    return ranNUM;
}

function init() {
    const randomNum = makeRan();
    paintImage(randomNum);
}

init();