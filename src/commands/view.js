import chalk from "chalk";
import Todo from "../models/todo.model.js";
import { connectDb, disconnectDb } from "../db/connectDb.js"

export async function viewCommands() {
    try {
        await connectDb()

        const todos = await Todo.find().sort({ createdAt: 1 })

        if (todos.length === 0) {
            console.log(chalk.red("No Todo Registered Yet"));
            return
        }

        console.log(chalk.yellowBright("Your Todos: \n"));

        todos.forEach(todo => {
            const status = todo.completed ? chalk.green("✅") : chalk.red("❌")

            console.log(`${status} ${todo.title} \n \t id: ${todo._id}`);
        })

        const doneCount = todos.filter(todo => todo.completed).length
        console.log(chalk.gray(`\n${doneCount} of ${todos.length} done`));
    } finally {
        await disconnectDb()
    }
}