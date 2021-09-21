import ts from "typescript";
import * as docGen from "react-docgen-typescript";

function parseDocumentation(filePath: string) {
  // The simplest option
  // const componentDocs = docGen.parse(filename);

  // react-docgen-typescript-plugin does something along this to allow
  // customizability
  const compilerOptions = {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.Latest,
  };
  const docgenOptions = {};
  const tsProgram = ts.createProgram([filePath], compilerOptions);
  const docGenParser = docGen.withCompilerOptions(
    compilerOptions,
    docgenOptions
  );
  const componentDocs = docGenParser.parseWithProgramProvider(
    [filePath],
    () => tsProgram
  );

  return componentDocs;
}

function test() {
  // TODO: Why props and methods are empty for both cases?
  console.log(parseDocumentation("./fixtures/Column.tsx"));
  console.log(parseDocumentation("./fixtures/DefaultPropValue.tsx"));
}

test();
