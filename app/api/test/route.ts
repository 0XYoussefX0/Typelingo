import { Octokit } from "octokit";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { name, type, code, description } = body;

  if (!name || !type || !code || !description) return null;

  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const octokit = new Octokit({ auth: session.provider_token });

  const content = Buffer.from(
    `# ${name}\n\n${description}\n\`\`\`\`ts\n${code}\n\`\`\`\``
  ).toString("base64");

  try {
    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: session.user.user_metadata.user_name,
      repo: "type-challenges-solutions",
      path: `${type.toUpperCase()}/${name}.md`,
      message: `Solved ${name} challenge`,
      committer: {
        name: session.user.user_metadata.user_name,
        email: session.user.user_metadata.email,
      },
      content: content,
    });

    console.log("Dispatch event created: ", data);
  } catch (error) {
    console.error("Error creating dispatch event: ", error);
  }
}
