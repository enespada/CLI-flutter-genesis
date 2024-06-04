import chalk from "chalk";

export const projectArchitecture = `📂 ${chalk.bold.whiteBright("root")}
├── 📜 ${chalk.bold.whiteBright("README.md")}
├── 📜 ${chalk.bold.whiteBright("commitlint.config.js")}
├── 📜 ${chalk.bold.whiteBright("nest-cli.json")}
├── 📜 ${chalk.bold.whiteBright("package-lock.json")}
├── 📜 ${chalk.bold.whiteBright("package.json")}
├── 📂 ${chalk.bold.whiteBright("src")}
│   │   ├──${chalk.bold.whiteBright("api")}
│   │   ├──${chalk.bold.whiteBright("application")}
│   ├── 🎨 ${chalk.bold.whiteBright("assets")}
│   │   ├── 🌎 ${chalk.bold.whiteBright("favicon.ico")}
│   │   ├── 🖼️ ${chalk.bold.whiteBright("favicon.jpg")}
│   │   └── 📜 ${chalk.bold.whiteBright("swagger.css.ts")}
│   │   ├──${chalk.bold.whiteBright("core")}
│   │   ├──${chalk.bold.whiteBright("domain")}
│   ├── 📂 ${chalk.bold.whiteBright("environments")}
│   │   ├── 📝 ${chalk.bold.whiteBright("dto")}
│   │   └── 📜 ${chalk.bold.whiteBright("environment.ts")}
│   │   ├──${chalk.bold.whiteBright("app.module.ts")}
│   └── 📜 ${chalk.bold.whiteBright("main.ts")}
├── 📂 ${chalk.bold.whiteBright("test")}
│   ├── 📜 ${chalk.bold.whiteBright("app.e2e-spec.ts")}
│   └── 📜 ${chalk.bold.whiteBright("jest-e2e.json")}
├── 📜 ${chalk.bold.whiteBright("tsconfig.build.json")}
└── 📜 ${chalk.bold.whiteBright("tsconfig.json")}`;
