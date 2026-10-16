const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const r1 = readline.createInterface({ input, output });

let tasks = [];
let nextId = 1;

function showMenu() {
  console.log("\n===TODO CLI===");
  console.log("1. Add Task");
  console.log("2. View Task");
  console.log("3. Mark Task as Done");
  console.log("4. Delete Task");
  console.log("0. Exit");
}

function viewTasks() {
  if (tasks.length === 0) return console.log("No task yet!");

  tasks.forEach((t) => {
    console.log(`${t.id}. [${t.done ? "✔" : " "}] ${t.title}`);
  });
}

async function addTask() {
  const title = (await r1.question("Task title: ")).trim();

  if (!title) return console.log("Task cannot be empty.");

  tasks.push({ id: nextId++, title, done: false });
  console.log("Task added!");
}

async function markDone() {
  const id = Number(await r1.question("Task id: "));

  if (Number.isNaN(id)) {
    return console.log("❌ Please enter a valid Id.");
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return console.log("❌ No task found with that Id.");
  }

  task.done = true;
  console.log(`✔ Task "${task.title}" marked as done!`);
}

async function deleteTask() {
  const id = Number(await r1.question("Enter task ID to delete: "));

  if (Number.isNaN(id)) {
    return console.log("❌ Please enter a valid number.");
  }

  const taskExists = tasks.some((t) => t.id === id);
  if (!taskExists) {
    return console.log("❌ No task found with that ID.");
  }

  tasks = tasks.filter((t) => t.id !== id);
  console.log("🗑️ Task deleted successfully!");
}

async function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = (await r1.question("Choose an Option: ")).trim();

    switch (choice) {
      case "1":
        await addTask();
        break;
      case "2":
        viewTasks();
        break;
      case "3":
        await markDone();
        break;
      case "4":
        await deleteTask();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("Invalid option, try again.");
    }
  }

  console.log("GoodBye!");
  r1.close();
}

main();
