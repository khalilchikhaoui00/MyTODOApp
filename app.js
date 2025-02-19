document.addEventListener("DOMContentLoaded", function () {
    let tasks = [];
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasksFromLocalStorage.length > 0) {
        tasks = tasksFromLocalStorage;
        updateTasksList();
    }
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    document.getElementById("taskForm").addEventListener("submit", function (e) {
        e.preventDefault(); 
        addTask();

    });

    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const text = taskInput.value.trim();
    
        if (text === "") return;
    
        tasks.push({ text: text, completed: false });
    
        taskInput.value = "";
        taskInput.blur(); 
        updateTasksList();
        saveTasks();
    }
  

    function updateTasksList() {
        const tasksList = document.getElementById("tasksList");
        tasksList.innerHTML = ''; 
    
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("taskItem");
    
            li.innerHTML = `
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="img/f2.png" class="edit-icon" data-index="${index}" style="cursor:pointer; width:20px;">
                    <img src="img/f1.png" class="delete-icon" data-index="${index}" style="cursor:pointer; width:20px;">
                </div>
            `;

    
            
            li.querySelector(".checkbox").addEventListener("change", function () {
                toggleTaskCompleted(index);
            });
    
            li.querySelector(".delete-icon").addEventListener("click", function () {
                deleteTask(index);
            });
    
            li.querySelector(".edit-icon").addEventListener("click", function () {
                editTask(index);
            });
    
            tasksList.appendChild(li);
        });
    
        updateProgressBar();
    }
    
    function toggleTaskCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTasksList();
        saveTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateTasksList();
        saveTasks();
    }

    function editTask(index) {
        index = parseInt(index);
        const newText = prompt("Edit your task:", tasks[index].text);
        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            updateTasksList();
            saveTasks();
        }
        saveTasks();

    }
    

    function updateProgressBar() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const progress = document.getElementById("progress");

        if (totalTasks > 0) {
            const percentage = (completedTasks / totalTasks) * 100;
            progress.style.width = percentage + "%";
        } else {
            progress.style.width = "0%";
        }

        document.getElementById("numbers").textContent = `${completedTasks} / ${totalTasks}`;
        if (completedTasks === totalTasks && totalTasks > 0) {
            blaskConfetti();
        }
    }
});
const blaskConfetti = () => {
    const end = Date.now() + 15 * 1000;
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
};