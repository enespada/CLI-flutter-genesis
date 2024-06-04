import ora from "ora";
import { commitlint, hooks, install, prepare, runPrepare } from "./commands";

const spinner = ora();
export const runHuskyCommand = (path: string) => {
  spinner.start("Instalando dependencias...");

  install(path).once("close", () => {
    spinner.succeed();
    spinner.start("Añadiendo configuración commitlint...");
    commitlint().once("close", () => {
      spinner.succeed();
      spinner.start("Editando package.json...");
      prepare().once("close", () => {
        spinner.succeed();
        spinner.start("Creando los hooks de husky...");
        runPrepare().once("close", () => {
          spinner.succeed();
          hooks(path).then(() =>
            console.log("Hooks instalados correctamente!")
          );
        });
      });
    });
  });
};
