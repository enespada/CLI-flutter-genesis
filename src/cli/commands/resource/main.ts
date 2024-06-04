import ora from "ora";
import { isProjectStructureValid } from "./commands";
import { projectArchitecture } from "../../templates/resource/project-architecture";
import * as fs from "fs";
import path, { join } from "path";
import { constants } from "../../templates/resource/constants";
import { entity } from "../../templates/resource/entity";
import {
  createDTO,
  paginationDTO,
  updateDTO,
} from "../../templates/resource/dtos";
import { controller } from "../../templates/resource/controller";
import { application } from "../../templates/resource/application";
import { domain } from "../../templates/resource/domain";
import { appModule } from "../../templates/resource/module";

const spinner = ora();
export const runResourceCommand = (path: string, resource: string) => {
  spinner.start("Comprobando arquitectura...");
  isProjectStructureValid(path).then((valid: boolean) => {
    if (!valid)
      return spinner.fail(
        `Arquitectura del proyecto no válida\nLa arquitectura del proyecto debe ser:\n${projectArchitecture}`
      );
    spinner.succeed();

    spinner.start("Creando recursos...");

    const entityName = toCamelCase(resource, true);
    const variable = toCamelCase(resource);
    const filename = resource.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    const srcPath = `${path}/src`;
    const folders = {
      module: {
        path: join(join(srcPath, "api", filename)),
        filename: `${filename}.module.ts`,
        data: appModule(entityName, filename),
      },
      controller: {
        path: join(join(srcPath, "api", filename)),
        filename: `${filename}.controller.ts`,
        data: controller(entityName, filename, variable),
      },
      application: {
        path: join(join(srcPath, "application", filename)),
        filename: `${filename}.service.ts`,
        data: application(entityName, filename, variable),
      },
      domain: {
        path: join(join(srcPath, "domain", filename)),
        filename: `${filename}.domain.ts`,
        data: domain(entityName, filename, variable),
      },
      constants: {
        path: join(join(srcPath, "api", filename, "constants")),
        filename: `${filename}.constants.ts`,
        data: constants(entityName, filename),
      },
      createDto: {
        path: join(join(srcPath, "api", filename, "dto")),
        filename: `create-${filename}.dto.ts`,
        data: createDTO(entityName),
      },
      updateDto: {
        path: join(join(srcPath, "api", filename, "dto")),
        filename: `update-${filename}.dto.ts`,
        data: updateDTO(entityName),
      },
      paginationDto: {
        path: join(join(srcPath, "api", filename, "dto")),
        filename: `${filename}-pagination-options.dto.ts`,
        data: paginationDTO(entityName, filename),
      },
      entities: {
        path: join(join(srcPath, "domain", filename, "entities")),
        filename: `${filename}.entity.ts`,
        data: entity(entityName),
      },
    };
    const values = Object.values(folders);

    mkdir(values.map((f) => f.path)).then(() => {
      write(values).then(() => {
        addImportToAppModule(path, entityName);
        spinner.succeed();
        console.log("Recursos creados correctamente!");
      });
    });
  });
};

export const mkdir = async (paths: Array<string>) => {
  return Promise.all(
    paths.map((p) => {
      return new Promise<void>((resolve, reject) => {
        fs.mkdir(p, { recursive: true }, (err: NodeJS.ErrnoException) => {
          if (err) reject(err);
          resolve();
        });
      });
    })
  );
};

export const write = async (files: Array<any>) => {
  return Promise.all(
    files.map((f) => {
      return new Promise<void>((resolve, reject) => {
        fs.writeFile(join(f.path, f.filename), f.data, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    })
  );
};

export const toCamelCase = (input: string, capitalize = false) => {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0)[capitalize ? "toUpperCase" : "toLowerCase"]() +
        word.slice(1)
    )
    .join("");
};

export const addImportToAppModule = (
  path: string,
  moduleName: string | undefined
) => {
  if (!moduleName) {
    console.error("Please provide a module name.");
    process.exit(1);
  }

  const appModulePath = join(path, "src/app.module.ts");
  const moduleImportPath = `@controller/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.module`;

  fs.readFile(appModulePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading AppModule file:", err);
      process.exit(1);
    }

    const importStatement = `import { ${moduleName}Module } from '${moduleImportPath}';\n`;
    const moduleDeclaration = `    ${moduleName}Module,`;

    // Check for specific lines and add after them
    const configModuleRegex =
      /ConfigModule\.forRoot\({[^]*?}\),\n    TypeOrmModule\.forRootAsync\({[^]*?}\),/;
    let updatedData;
    if (configModuleRegex.test(data)) {
      updatedData = data.replace(
        configModuleRegex,
        (match) => `${match}\n${moduleDeclaration}`
      );
    } else {
      // Add as the first import if specific lines not found
      updatedData = data.replace(
        /(imports: \[)([^]*?)(\])/,
        `$1\n${moduleDeclaration}$2$3`
      );
    }

    // Add the import statement at the top
    const newData = importStatement + updatedData;

    fs.writeFile(appModulePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to AppModule file:", err);
        process.exit(1);
      }

      console.log(`${moduleName}Module has been added to AppModule imports.`);
    });
  });
};
