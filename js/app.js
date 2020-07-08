// Select
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


// event
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded',getTodos);

// function 

function addTodo(event){
    // mencegah from dari sumbiting 
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to localstorage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<img src="img/check.png" class="button-img">'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<img src="img/delete.png" class="button-img">'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        }); 
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    // check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<img src="img/check2.png" class="button-img">'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<img src="img/trash.png" class="button-img">'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}