const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to save todos to local storage
const saveTodosToLocalStorage = () => {
  const todos = [];
  const listItems = todoList.querySelectorAll("li");

  listItems.forEach(item => {
    const checkbox = item.querySelector(".checkbox").checked;
    const text = item.querySelector("p").innerText;
    todos.push({ text, checked: checkbox });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => {
    // Creating li tag
    const li = document.createElement("li");

    // Creating checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todo.checked;
    li.appendChild(checkbox);

    // Creating p tag
    const p = document.createElement("p");
    p.innerHTML = todo.text;
    p.style.textDecoration = todo.checked ? "line-through" : "none"; // Apply line-through if checked
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
  });
};

// Function to add todo
const addTodo = () => {
  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("You must write something");
    return false;
  }

  if (addBtn.value === "Edit") {
    // Find the <p> tag that needs to be updated
    const pTag = editTodo.target.previousElementSibling; // This assumes the <p> is the sibling before the button
    pTag.innerHTML = inputText; // Update the p tag with new text
    pTag.style.textDecoration = pTag.previousElementSibling.checked ? "line-through" : "none"; // Adjust line-through based on checkbox state
    addBtn.value = "Add"; // Reset button text to "Add"
    inputBox.value = ""; // Clear input box
    editTodo = null; // Reset editTodo reference

    // Save the updated list to local storage
    saveTodosToLocalStorage();
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

    // Append the new item to the end of the list
    todoList.appendChild(li);
    inputBox.value = "";

    // Save the updated list to local storage
    saveTodosToLocalStorage();
  }
};

// Function to update: edit/delete todo
const updateTodo = (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    todoList.removeChild(e.target.parentElement);

    // Save the updated list to local storage
    saveTodosToLocalStorage();
  }

  if (e.target.classList.contains("editBtn")) {
    const pTag = e.target.previousElementSibling; // Access the p tag directly
    inputBox.value = pTag.innerHTML; // Set input box value to the current p tag text
    inputBox.focus();
    addBtn.value = "Edit"; // Change button text to "Edit"
    editTodo = e; // Store the edit event for updating
  }

  // Handle checkbox state change
  if (e.target.classList.contains("checkbox")) {
    const pTag = e.target.nextElementSibling; // Get the p tag after the checkbox
    const isChecked = e.target.checked;
    pTag.style.textDecoration = isChecked ? "line-through" : "none"; // Apply or remove line-through

    // Save the updated list to local storage
    saveTodosToLocalStorage();
  }
};

// Initialize the todo list from local storage
loadTodosFromLocalStorage();

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
