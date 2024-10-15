document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("task"));
    if (storedTasks) {
        storedTasks.forEach(task => tasks.push(task));
        updateTaskList();
        updateStats();
    }
});
const tasks = []; 
const saveTask = () => {
    localStorage.setItem('task', JSON.stringify(tasks));
}
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) { 
        tasks.push({ text: text, completed: false });
        updateTaskList();
        taskInput.value = "";
        saveTask();
    } else {
        alert("Please add a task before submitting.");
    }
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTask();
};
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    saveTask();
};
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    saveTask();
};
const updateTaskList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = ""; 
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("taskItem");
        listItem.innerHTML = `
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./Img/edit.png" onClick="editTask(${index})"/>
                <img src="./Img/del.png" onClick="deleteTask(${index})"/>
            </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};
document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});
