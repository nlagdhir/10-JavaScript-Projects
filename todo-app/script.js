const form = document.querySelector('#form');
const input = document.querySelector('#input');
const todos = document.querySelector('#todos');

const todosList = JSON.parse(localStorage.getItem('todos'));

form.addEventListener('submit',event => {
    event.preventDefault();

    addTodo();
})

const updateLS = () => {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text : todoEl.innerText,
            completed : todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

const addTodo = (todo) => {
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }
    if(todoText){

        const todoEl = document.createElement('li');
        todoEl.innerText = todoText;
        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        todoEl.addEventListener('click',() => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        })
        
        todos.appendChild(todoEl);
        
        input.value = '';

        updateLS();
    }
}

if(todosList){
    
    todosList.forEach(todoList => {
        addTodo(todoList);    
    })
}


