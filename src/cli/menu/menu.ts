import inquirer, { QuestionCollection } from "inquirer";
import Choice from "inquirer/lib/objects/choice";

export const ChoicesValues = {
  CREATE_PROJECT: {
    name: "Crear un nuevo proyecto NestJS",
    value: "create-project",
  } as Choice,
  CREATE_CRUD: {
    name: "Crear un nuevo crud",
    value: "create-project",
  } as Choice,
  EXIT: {
    name: "Salida",
    value: "exit",
  } as Choice,
};

export function menuQuestion() {
  const menuOptions: QuestionCollection<any> = [
    {
      type: "list",
      name: "option",
      message: "Seleccione una opción:",
      choices: [
        ChoicesValues.CREATE_PROJECT,
        ChoicesValues.CREATE_CRUD,
        ChoicesValues.EXIT,
      ] as Array<Choice>,
    },
  ];
  return new Promise<void>((res, rej) => {
    try {
      inquirer.prompt(menuOptions).then((answers) => {
        switch (answers.option) {
          case "create-project":
            console.log('You selected "Create a new NestJS project"');
            res();
            break;
          case "exit":
            console.log("Goodbye!");
            res();
            process.exit();
            break;
          default:
            console.log("Invalid option");
            res();
            this();
        }
      });
    } catch (error) {
      rej();
    }
  });
}
