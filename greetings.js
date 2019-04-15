const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

const paintGreeting = text => {
  form.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.innerHTML = `Welcome, ${text}`;
};

const saveName = text => {
  localStorage.setItem(USER_LS, text);
};

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
const askForName = () => {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
};
const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
};

const initGreetings = () => {
  loadName();
};

initGreetings();
