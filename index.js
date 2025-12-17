var allElems = document.querySelectorAll(".elem");
var allFullElem = document.querySelectorAll(".fullScreen");
var allBackButtons = document.querySelectorAll(".back-btn");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    var index = Number(elem.id);

    allFullElem[index].style.display = "block";
  });
});

allBackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var index = Number(button.id);

    allFullElem[index].style.display = "none";
  });
});
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let todos = [];

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}

function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
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
    }
  };

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const newText = input.value.trim();
      if (newText !== "") {
        todo.text = newText;
        renderTodos();
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
    editBtn.innerHTML = "✏️";
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
