const allElems = document.querySelectorAll(".elem");
const allFullElem = document.querySelectorAll(".fullScreen");
const allBackButtons = document.querySelectorAll(".back-btn");

const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    var index = Number(elem.id);

    allFullElem.forEach((fs) => fs.classList.remove("active"));
    allFullElem[index].classList.add("active");
  });
});

allBackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var index = Number(button.id);

    allFullElem[index].classList.remove("active");
  });
});

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let todos = [];

const savedTodos = localStorage.getItem("todos"); // if todos exist, get those todos and name them savedTodos

if (savedTodos) {
  // if you do get savedTodos
  todos = JSON.parse(savedTodos); // parse them into objects
  console.log("Saved todos = ", savedTodos);
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

function saveTodosLocally() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo); // todos me jitne bhi elements hai unn sabko todo bola gaya hai

  todoInput.value = "";
  renderTodos();
  saveTodosLocally();
}

function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
    saveTodosLocally();
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
  saveTodosLocally();
}

function editTodo(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  const textSpan = li.querySelector(".todo-text");
  const editBtn = li.querySelector(".edit-btn");
  const todo = todos.find((t) => t.id === id);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "todo-input";
  input.value = todo.text;

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";
  saveBtn.onclick = function () {
    const newText = input.value.trim();
    if (newText !== "") {
      todo.text = newText;
      renderTodos();
      saveTodosLocally();
    }
  };

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const newText = input.value.trim();
      if (newText !== "") {
        todo.text = newText;
        renderTodos();
        saveTodosLocally();
      }
    }
  });

  textSpan.replaceWith(input);
  editBtn.replaceWith(saveBtn);
  input.focus();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.setAttribute("data-id", todo.id);

    const checkBtn = document.createElement("div");
    checkBtn.className = "check-btn" + (todo.completed ? " checked" : "");
    checkBtn.onclick = () => toggleComplete(todo.id);

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text" + (todo.completed ? " completed" : "");
    textSpan.textContent = todo.text;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = "✏️ ";
    editBtn.onclick = () => editTodo(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(checkBtn);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

updateClock();
setInterval(updateClock, 1000);
