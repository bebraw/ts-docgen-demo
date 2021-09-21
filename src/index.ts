import ts from "typescript";
import * as docGen from "react-docgen-typescript";
import * as fs from "fs";
import { generateDocgenCodeBlock } from "./generateDocgenCodeBlock";

function parseDocumentation(filename: string) {
  const source = fs.readFileSync(filename, { encoding: "utf-8" });
  const compilerOptions = {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.Latest,
  };
  const docgenOptions = {};
  // TODO: Figure out what the first parameter is doing
  const tsProgram = ts.createProgram([filename], compilerOptions);
  const docGenParser = docGen.withCompilerOptions(
    compilerOptions,
    docgenOptions
  );
  const componentDocs = docGenParser.parseWithProgramProvider(
    source,
    () => tsProgram
  );

  return generateDocgenCodeBlock({
    filename,
    source,
    componentDocs,
    docgenCollectionName: "STORYBOOK_REACT_CLASSES",
    setDisplayName: true,
    typePropName: "type",
  });
}

function test() {
  console.log(parseDocumentation("./fixtures/DefaultPropValue.tsx"));
}

test();
