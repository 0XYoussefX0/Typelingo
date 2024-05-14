import { createProject } from "@ts-morph/bootstrap";

export async function POST(request: Request) {
  const [res, project] = await Promise.all([request.json(), createProject({ useInMemoryFileSystem: true })]);

project.fileSystem.writeFileSync("MyClass.ts", res.code);

let program = project.createProgram({
  rootNames: ["MyClass.ts"],
  options: {},
});

const diagnostics = program.getSemanticDiagnostics(); 

return Response.json({ solution: diagnostics.length > 0 ? "incorrect" : "correct" });
}