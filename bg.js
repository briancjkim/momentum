const body = document.querySelector("body");
const ImageNumber = 7;

function loadImages() {
  const randomNo = Math.floor(Math.random() * ImageNumber);
  // const image = new Image();
  // image.src = `images/${randomNo + 1}.jpg`;
  // image.classList.add("bgImage");
  const image = document.createElement("div");
  image.classList.add("bgImage");
  image.classList.add(`bgImage-${randomNo + 1}`);
  // image.style.backgroundImage = `url(images/${randomNo + 1}.jpg)`;
  body.appendChild(image);
}

function init() {
  loadImages();
}

init();
