import chalk from "chalk";

export const projectArchitecture = `📂 ${chalk.bold.whiteBright("root")}
└── 📂 ${chalk.bold.whiteBright("src")}
        ├──${chalk.bold.greenBright("api")}
        ├──${chalk.bold.yellowBright("application")}
        └──${chalk.bold.blueBright("domain")}`;
