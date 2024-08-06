const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to add todo
const addTodo = () => {
  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("You must write something");
    return false;
  }

  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
    editTodo = null;
  } else {
    // Creating li tag
    const li = document.createElement("li");

    // Creating checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    li.appendChild(checkbox);

    // Creating p tag
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";
  }
};

// Function to update: edit/delete todo
const updateTodo = (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    todoList.removeChild(e.target.parentElement);
  }

  if (e.target.classList.contains("editBtn")) {
    inputBox.value = e.target.previousElementSibling.previousElementSibling.innerHTML; // Adjust to get the p tag content
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }

  // Optionally handle checkbox state change
  if (e.target.classList.contains("checkbox")) {
    const isChecked = e.target.checked;
    e.target.nextElementSibling.style.textDecoration = isChecked ? "line-through" : "none";
  }
};

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
