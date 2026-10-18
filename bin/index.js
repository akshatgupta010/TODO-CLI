#!/usr/bin/env node

import { Command } from "commander"
import chalk from "chalk"
import { addCommand } from "../src/commands/add.js"
import { viewCommands } from "../src/commands/view.js"
import { doneCommand } from "../src/commands/done.js"
import { deleteCommand } from "../src/commands/delete.js"
import { menuCommand } from "../src/commands/menu.js"

const program = new Command()

program
    .name("todo")
    .description("CLI Todo App")
    .version("1.0.0")

program
    .command("add <title...>")
    .description("Add a new Todo (quotes optional)")
    .action(addCommand)

program
    .command("view")
    .description("List Todos")
    .action(viewCommands)

program
    .command("done <id>")
    .description("Mark Todo as done")
    .action(doneCommand)

program
    .command("delete <id>")
    .description("Delete Todo")
    .action(deleteCommand)

program
    .command("menu")
    .description("Open the interactive menu")
    .action(menuCommand)

try {
    await program.parseAsync(process.argv)
} catch (error) {
    console.log(chalk.red(`✖ ${error.message}`));
    process.exitCode = 1
}