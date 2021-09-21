import ts from "typescript";
import * as docGen from "react-docgen-typescript";
import * as fs from "fs";
import { generateDocgenCodeBlock } from "./generateDocgenCodeBlock";

function parseDocumentation(filename: string) {
  const source = fs.readFileSync(filename, { encoding: "utf-8" });
  const componentDocs = docGen.parse(filename);

  return generateDocgenCodeBlock({
    filename,
    source,
    componentDocs,
    docgenCollectionName: "STORYBOOK_REACT_CLASSES",
    setDisplayName: true,
    typePropName: "type",
  });
}

// react-docgen-typescript-plugin does something along this. I kept it simple above
// for the MVP.
/*const compilerOptions = {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.Latest,
  };
  const docgenOptions = {};
  const tsProgram = ts.createProgram([filename], compilerOptions);
  const docGenParser = docGen.withCompilerOptions(
    compilerOptions,
    docgenOptions
  );
  const componentDocs = docGenParser.parseWithProgramProvider(
    source,
    () => tsProgram
  );*/

function test() {
  console.log(parseDocumentation("./fixtures/Column.tsx"));
}

test();
