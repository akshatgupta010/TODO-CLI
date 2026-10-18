import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";
import mongoose from "mongoose";
import { addCommand } from "./add.js";
import { viewCommands } from "./view.js";
import { doneCommand } from "./done.js";
import { deleteCommand } from "./delete.js";

function showMenu() {
    console.log(chalk.yellowBright("\n=== TODO CLI ==="));
    console.log("1. Add Todo");
    console.log("2. View Todos");
    console.log("3. Mark Todo as Done");
    console.log("4. Delete Todo");
    console.log("0. Exit");
}

export async function menuCommand() {
    const rl = readline.createInterface({ input, output })

    async function askForId(question) {
        const id = (await rl.question(question)).trim()

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(chalk.red("❌ Please enter a valid id."));
            return null
        }
        return id
    }

    try {
        let running = true

        while (running) {
            showMenu()
            const choice = (await rl.question("Choose an Option: ")).trim()

            switch (choice) {
                case "1": {
                    const title = (await rl.question("Todo title: ")).trim()
                    await addCommand(title)
                    break
                }
                case "2":
                    await viewCommands()
                    break
                case "3": {
                    const id = await askForId("Todo id: ")
                    if (id) await doneCommand(id)
                    break
                }
                case "4": {
                    const id = await askForId("Enter todo id to delete: ")
                    if (id) await deleteCommand(id)
                    break
                }
                case "0":
                    running = false
                    break
                default:
                    console.log(chalk.red("Invalid option, try again."));
            }
        }

        console.log(chalk.blue("GoodBye!"));
    } finally {
        rl.close()
    }
}