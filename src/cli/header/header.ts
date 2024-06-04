import * as figlet from "figlet";
import chalk from "chalk";
import boxen from "boxen";

const options: any = {
  font: "Star Wars",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
};

const cliName = chalk.yellow(figlet.textSync("Cli One \nKenobi", options));
const poweredBy = chalk.gray("Powered by: Sergi (https://github.com/laviida)");

const header = boxen(`${cliName}\n\n${poweredBy}`, {
  padding: 1,
  margin: 1,
  borderStyle: "double",
  borderColor: "yellow",
});

export const showHeader = () => {
  // console.log(header);
};
