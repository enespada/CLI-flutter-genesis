[![NPM](https://img.shields.io/badge/npm-v10.1.0-%232C8EBB.svg?logo=npm&logoColor=white)](https://www.npmjs.com/) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![NodeJS](https://img.shields.io/badge/node.js-v20.9.0-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en/)

# CLI Nest Genesis

The CLI Nest Genesis simplifies the creation of NestJS projects with a robust 3-tier architecture following best practices. It eases the initial setup, allowing you to focus on implementing your business logic instead of dealing with basic project structure and configuration. It also ensures that your project is ready to run on Node.js 20.9.0, the latest stable release.

## Main Features

3-Tier Architecture: It promotes a structure organized in three layers: Controllers, Services and Repositories. This architecture improves the modularity and maintainability of your application.

Node.js 20.9.0: Take advantage of the latest Node.js features and performance improvements to develop faster and more efficient applications.

Predefined Configuration: Initial configuration for databases, logging, and exception handling. Saves time on initial configuration.

Integrated Testing: Includes tools for unit and integration testing, encouraging test-driven development (TDD).

Consistent Code Style: Follows coding best practices and ensures that your code is clean, maintainable and scalable.

## Installation

```bash
  $ npm install -g nest-genesis
```

## Usage

```bash
  $ genesis --help
```

## Arcuitecture

```bash
📂 root
├── 📜 README.md
├── 📜 commitlint.config.js
├── 📜 nest-cli.json
├── 📜 package-lock.json
├── 📜 package.json
├── 📂 src
│   ├── 🌐 api
│   ├── 🚀 application
│   ├── 🎨 assets
│   │   ├── 🌎 favicon.ico
│   │   ├── 🖼️  favicon.jpg
│   │   └── 📜 swagger.css.ts
│   ├── 🔧 core
│   ├── 🏢 domain
│   ├── 📂 environments
│   │   ├── 📝 dto
│   │   └── 📜 environment.ts
│   ├── 📜 app.module.ts
│   └── 📜 main.ts
├── 📂 test
│   ├── 📜 app.e2e-spec.ts
│   └── 📜 jest-e2e.json
├── 📜 tsconfig.build.json
└── 📜 tsconfig.json
```

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed. For more details take a look at the file [LICENSE](./LICENSE).
