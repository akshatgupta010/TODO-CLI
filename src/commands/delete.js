import chalk from "chalk"
import mongoose from "mongoose";
import Todo from "../models/todo.model.js"
import { connectDb, disconnectDb } from "../db/connectDb.js";

export async function deleteCommand(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(chalk.red("Enter a valid id"));
        return
    }

    try {
        await connectDb()

        const deletedTodo = await Todo.findByIdAndDelete(id)

        if (!deletedTodo) {
            console.log(chalk.red("Todo not found to be deleted"));
            return
        }

        console.log(chalk.green("✅ Todo deleted:"));
        console.log(chalk.white(deletedTodo.title));
    } finally {
        await disconnectDb()
    }
}