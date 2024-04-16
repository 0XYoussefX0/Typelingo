import { createProject } from "@ts-morph/bootstrap";

export async function POST(request: Request) {
  const res = await request.json()
  const project = await createProject({ useInMemoryFileSystem: true });

    project.fileSystem.writeFileSync("MyClass.ts", res.code);

    const program = project.createProgram({
      rootNames: ["MyClass.ts"],
      options: {},
    });

    const diagnostics = program.getSemanticDiagnostics();

    if(diagnostics.length > 0) {
      return Response.json({ solution: "incorrect" })
    }
    else {
      return Response.json({ solution: "correct" })
    }
}