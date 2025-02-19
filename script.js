
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const allTasksBtn = document.getElementById("allTasks");
    const pendingTasksBtn = document.getElementById("pendingTasks");
    const completedTasksBtn = document.getElementById("completedTasks");

    let tasks = [];

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <span>${task.text} (Due: ${task.date} at ${task.time})</span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim() !== "" && taskDate.value !== "" && taskTime.value !== "") {
            tasks.push({ text: taskInput.value, date: taskDate.value, time: taskTime.value, completed: false });
            taskInput.value = "";
            taskDate.value = "";
            taskTime.value = "";
            renderTasks();
        }
    });

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    allTasksBtn.addEventListener("click", () => renderTasks("all"));
    pendingTasksBtn.addEventListener("click", () => renderTasks("pending"));
    completedTasksBtn.addEventListener("click", () => renderTasks("completed"));

    renderTasks();
});
