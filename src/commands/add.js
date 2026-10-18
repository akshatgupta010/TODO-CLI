import chalk from "chalk";
import Todo from "../models/todo.model.js"
import { connectDb, disconnectDb } from "../db/connectDb.js";

export async function addCommand(titleInput) {
    const title = (Array.isArray(titleInput) ? titleInput.join(" ") : titleInput).trim()

    if (!title) {
        console.log(chalk.red("Todo title cannot be empty"));
        return
    }

    try {
        await connectDb()

        const todo = await Todo.create({ title })

        console.log(chalk.green("✅ Todo Added"));
        console.log(chalk.white(`${todo._id} -> ${todo.title}`));
    } finally {
        await disconnectDb()
    }
}