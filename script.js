const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodoIndex = null;                // Store the index of the todo item being edited
let todos = [];                         // Array to store todo items

// Function to save todos to local storage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = storedTodos;
  renderTodos();
};

// Function to render todos from the array
const renderTodos = () => {
  todoList.innerHTML = '';                                   // Clear existing items
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    // Creating checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todo.checked;
    checkbox.addEventListener("change", () => handleCheckboxChange(index));
    li.appendChild(checkbox);

    // Creating p tag
    const paragraph = document.createElement("p");
    paragraph.innerHTML = todo.text;
    paragraph.style.textDecoration = todo.checked ? "line-through" : "none";
    li.appendChild(paragraph);

    // Creating edit Btn with icon
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';                       // Font Awesome edit icon
    editBtn.classList.add("btn", "editBtn");
    editBtn.addEventListener("click", () => handleEdit(index));
    li.appendChild(editBtn);

    // Creating delete btn with icon
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';                   // Font Awesome delete icon
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.addEventListener("click", () => handleDelete(index));
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
};

// Function to add todo
const addTodo = () => {

  console.log('button clicked sucessfully');

  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("You must write something");
    return;
  }

  if (editTodoIndex !== null) {
    // Update existing todo
    todos[editTodoIndex].text = inputText;
    todos[editTodoIndex].checked = todos[editTodoIndex].checked;            // Preserve the checked state
    editTodoIndex = null;
    addBtn.innerText = "Add";
  } else {
    // Add new todo
    todos.push({ text: inputText, checked: false });
  }

  inputBox.value = "";
  saveTodosToLocalStorage();
  renderTodos();
};

// Function to handle checkbox change
const handleCheckboxChange = (index) => {
  todos[index].checked = !todos[index].checked;
  saveTodosToLocalStorage();
  renderTodos();
};

// Function to handle edit
const handleEdit = (index) => {
  inputBox.value = todos[index].text;
  inputBox.focus();
  addBtn.innerText = "Edit";
  editTodoIndex = index;
};

// Function to handle delete
const handleDelete = (index) => {
  todos.splice(index, 1);
  saveTodosToLocalStorage();
  renderTodos();
};

// Initialize the todo list from local storage
loadTodosFromLocalStorage();
addBtn.addEventListener("click", addTodo);
