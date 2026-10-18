import chalk from "chalk";
import mongoose from "mongoose";
import Todo from "../models/todo.model.js"
import { connectDb, disconnectDb } from "../db/connectDb.js"

export async function doneCommand(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(chalk.red("Enter a valid id"));
        return
    }

    try {
        await connectDb()

        const todo = await Todo.findById(id)

        if (!todo) {
            console.log(chalk.red("No Todo Found"));
            return
        }

        if (todo.completed) {
            console.log(chalk.yellow("Todo is already done:"));
            console.log(chalk.white(todo.title));
            return
        }

        todo.completed = true
        await todo.save()

        console.log(chalk.green("✅ Todo marked as done:"));
        console.log(chalk.white(todo.title));
    } finally {
        await disconnectDb()
    }
}