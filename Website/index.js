
// variables and constants

let Level = 1;
let xp = 0;
const LevelXP = 50;


//loads and saves tasks to local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to create a button
function createButton(task){
    const btn = document.createElement("button");
    btn.textContent = task.text;

    if (task.done) btn.style.backgroundColor = "green";

    btn.onclick = () => {
        if(!task.done) {
            task.done = true;
            btn.style.backgroundColor = "green"
            addXp(10);
            saveTasks();
        }
    }

    document.getElementById("TaskList").appendChild(btn);
}

//allows tasks to be displayed when page reloads
tasks.forEach(createButton);

//adds experience and allows for leveling up
function addXp(XPamount) {
    xp += XPamount;

    while (xp >= LevelXP){
        xp -= LevelXP;
        Level++;
    }

    document.getElementById("Level").textContent = Level;
    document.getElementById("xp").textContent = xp;

}


//creating a button logic
document.getElementById("CreateTaskButton").onclick = function(){
    const input = document.getElementById("TaskCreator");
    const text = input.value.trim();
    if (!text) return;

    const task = {text: text, done: false };
    tasks.push(task);

    createButton(task);
    saveTasks();

    input.value = "";
};


//removes tasks if user clicks reset button
document.getElementById("DeleteTasks").onclick = () => {
    localStorage.removeItem("tasks");
    document.getElementById("TaskList").innerHTML = "";
    tasks = [];
}
   
