import * as shell from "shelljs";
import * as fs from "fs";
import { commitMsg } from "../../templates/husky/commit-msg";
import { postCommit } from "../../templates/husky/post-commit";

export const install = (path: string) => {
  return shell
    .cd(path)
    .exec("npm install husky @commitlint/cli @commitlint/config-conventional", {
      async: true,
    });
};

export const commitlint = () => {
  return shell.exec(
    "echo module.exports = { extends: ['@commitlint/config-conventional'] }; > commitlint.config.js",
    { async: true }
  );
};

export const prepare = () => {
  return shell.exec(
    'npx npe scripts._prepare "husky install && husky add .husky/commit-msg && husky add .husky/post-commit"',
    { async: true }
  );
};

export const runPrepare = () => {
  return shell.exec("npm run _prepare", { async: true });
};

export const hooks = async (path: string) => {
  const p1 = new Promise<void>((resolve, reject) => {
    fs.writeFile(`${path}/.husky/commit-msg`, commitMsg, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

  const p2 = new Promise<void>((resolve, reject) => {
    fs.writeFile(`${path}/.husky/post-commit`, postCommit, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

  await Promise.all([p1, p2]);
  return shell.mv(`${path}/.husky/post-commit`, `${path}/.husky/_post-commit`);
};
