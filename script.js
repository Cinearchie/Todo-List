document.addEventListener('DOMContentLoaded', ()=>{
const input = document.getElementById("todo-input");
const btn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem('tasks'))||[];
tasks.forEach(element => {
    renderTask(element);
});
btn.addEventListener('click',()=>{
    const text = input.value.trim();
    if(text === ""){
        return;
    }

    const newTask = {
        id:Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    input.value = "";
    console.log(tasks);
})

function saveTask(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function renderTask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed){
        li.classList.add("completed");
    }
    li.innerHTML = `<span>${task.text}</span>
    <button>Work Done</button>`;
    li.addEventListener('click' ,(e)=>{
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTask();
    });
    li.querySelector('button').addEventListener('click' , (e) =>{
        e.stopPropagation(); // prevent toggle from firing
        tasks = tasks.filter(element => element.id !== task.id);
        li.remove()
        saveTask()
    })
    todoList.appendChild(li);
}
})