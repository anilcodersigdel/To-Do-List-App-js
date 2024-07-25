const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const addTodo = () => {
  // alert('Hello World!')

  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("you must write something");
    return false;
  }

  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    
    // addBtn.innerText = "Add";
    inputBox.value = "";
    editTodo = null; // Reset editTodo after editing
  } else {
    // Creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    // create a edit Btn class
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    // create a delete Btn class
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    // addBtn.innerText = "Edit";   
    editTodo = e;
  }
};

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
