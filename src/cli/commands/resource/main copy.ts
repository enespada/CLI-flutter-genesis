import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Usage: generate-files <abstract-class-path>");
  process.exit(1);
}

const abstractClassPath = args[0];

if (!fs.existsSync(abstractClassPath)) {
  console.error(`File not found: ${abstractClassPath}`);
  process.exit(1);
}

const abstractClassContent = fs.readFileSync(abstractClassPath, "utf-8");
const classNameMatch = abstractClassContent.match(/abstract class (\w+)/);

if (!classNameMatch) {
  console.error("No abstract class found in the specified file.");
  process.exit(1);
}

const className = classNameMatch[1];
const methodMatches = [
  ...abstractClassContent.matchAll(/(\w+)\s+(\w+)\(([^)]*)\);/g),
];

const methods = methodMatches
  .map(
    (match) =>
      `  @override\n  ${match[1]} ${match[2]}(${match[3]}) {\n    // TODO: implement ${match[2]}\n  }`
  )
  .join("\n\n");

const outputDir = path.join(
  path.dirname(abstractClassPath),
  `${className.toLowerCase()}_files`
);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const templatesDir = path.join(__dirname, "../templates");
const filesToGenerate = [
  { template: "remote_template.dart", output: `${className}RemoteImpl.dart` },
  { template: "data_template.dart", output: `${className}DataImpl.dart` },
  {
    template: "view_model_template.dart",
    output: `${className}ViewModel.dart`,
  },
];

filesToGenerate.forEach(({ template, output }) => {
  const templatePath = path.join(templatesDir, template);
  const filePath = path.join(outputDir, output);

  if (fs.existsSync(templatePath)) {
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const fileContent = templateContent
      .replace(/{{className}}/g, className)
      .replace(/{{methods}}/g, methods);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, fileContent);
      console.log(`Generated: ${filePath}`);
    } else {
      console.log(`File already exists: ${filePath}`);
    }
  } else {
    console.error(`Template not found: ${templatePath}`);
  }
});
