import ora from "ora";
import { isProjectStructureValid } from "./commands";
import { projectArchitecture } from "../../templates/resource/project-architecture";
import * as fs from "fs";
import { join } from "path";

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
