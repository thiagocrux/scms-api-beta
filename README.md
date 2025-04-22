# Syphilis Case Management System - BETA (API)

API of a syphilis case management application made with Node.js and TypeScript. This is a BETA version developed for a college assignment.

## Technologies

These are some of the tecnologies used in this project:

- `bcrypt`: A library for hashing passwords securely using the bcrypt algorithm. Protects against brute-force attacks by incorporating salting and slow hashing.
- `commitizen`: A command-line tool that helps you write consistent and properly formatted Git commit messages by providing an interactive prompt.
- `commitlint`: A tool that checks your commits and ensures consistency in version control.
- `cz-conventional-changelog`: An adapter for Commitizen that follows the Conventional Commits specification.
- `dotenv`: A module that loads a `.env` file into `process.env`.
- `express`: A Node.js minimalist framework.
- `husky`: A tool for adding Git hooks to automate tasks like linting, testing, or commits in JavaScript/Node.js projects.
- `jsonwebtoken`: A library for creating and verifying JSON Web Tokens (JWT), a secure way to transmit data between parties as a signed token.
- `mongoose`: A Node.js ODM for MongoDB that simplifies data modeling and queries.
- `pino`: A very low overhead Node.js logger.
- `prettier`: A code formatter.
- `ts-node-dev`: Allows you to run TypeScript files directly without pre-compilation, automatically restarting the server when changes are detected—ideal for rapid development.

_For more information about other dependencies, see the `package.json` file._

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/scms-api-beta.git
```

2. Browse to the project folder:

```bash
cd scms-api-beta
```

3. Install dependencies:

```
yarn install
```

## Available scripts

This section describes the available scripts in the `package.json` file and their functionalities.

### Development

- #### `dev`

  Starts the server in development mode, enabling faster builds and live-reloading.

  ```bash
  yarn dev
  ```

### Production

- #### `build`

  Compiles the application for production.

  ```bash
  yarn build
  ```

### Git hooks

- #### `prepare`
  Automatically configures Git hooks (via `husky`) before each commit.
  ```
  yarn prepare
  ```

### Utilities

- #### `commit`
  Open the `commitizen` interactive commit prompt.
  ```
  yarn commit
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
