const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
const SHOWING = "showing";

const saveTodos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const handleDelBtnClick = e => {
  const btn = e.target;
  const li = btn.parentElement;

  toDoList.removeChild(li);
  const cleanedToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanedToDos;
  saveTodos();
  toDoForm.classList.add(SHOWING);
};

function paintToDo(text) {
  const id = toDos.length + 1;
  const li = document.createElement("li");
  li.id = id;
  const delBtn = document.createElement("span");
  delBtn.classList.add("btn");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDelBtnClick);
  const span = document.createElement("span");
  span.innerHTML = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);

  const newObject = {
    id,
    text
  };
  toDos.push(newObject);
  saveTodos();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoForm.classList.remove(SHOWING);
  toDoInput.value = "";
}
const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const parsedToDos = JSON.parse(loadedToDos);
  if (parsedToDos.length !== 0) {
    console.log("has todos");
    parsedToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  } else {
    console.log("nothin");
    toDoForm.classList.add(SHOWING);
  }
};

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
