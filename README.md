# TODO CLI

A simple Node.js command-line todo application built with MongoDB and Mongoose.

## Features

- Add todos
- View all todos
- Mark todos as completed
- Delete todos
- Interactive menu mode

## Requirements

- Node.js 18+
- MongoDB running locally or in a remote MongoDB instance

## Installation

1. Clone the repository
2. Open the project folder:
   ```bash
   cd TODO-CLI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
5. Update the MongoDB connection string in `.env` if needed:
   ```env
   MONGO_URI=mongodb://localhost:27017/todo-cli
   ```

## Run the app

### Add a todo
```bash
node bin/index.js add "Learn Node.js"
```

### View todos
```bash
node bin/index.js view
```

### Mark a todo as done
```bash
node bin/index.js done <todo-id>
```

### Delete a todo
```bash
node bin/index.js delete <todo-id>
```

### Open interactive menu
```bash
node bin/index.js menu
```

## Global command option

If you want to run the app as a global command:

```bash
npm link
```

Then you can run:

```bash
todo add "Learn Node.js"
```

## Notes

- Do not commit your real `.env` file.
- Keep `.env.example` as the public-safe template.
- This project is intended to be shared publicly, so avoid storing secrets or personal local config in the repo.
