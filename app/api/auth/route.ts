import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Enums } from "@/lib/database";

import { Octokit, App } from "octokit";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  let signUp = searchParams.get("signUp") ?? "true";
  signUp = JSON.parse(signUp);

  let multiStepFormData;
  if (signUp) {
    multiStepFormData = searchParams.get("multiStepFormData");
    if (!multiStepFormData) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
    multiStepFormData = JSON.parse(multiStepFormData);
  }

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const {
      error,
      data: { user, session },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (signUp && user && session) {
        const { cameFrom, linkedGithub, enabled_notifications, goal } =
          multiStepFormData as {
            cameFrom: Enums<"social_media">;
            linkedGithub: boolean;
            enabled_notifications: boolean;
            goal: Enums<"goal">;
          };

        const { error: profilesError } = await supabase
          .from("profiles")
          .insert({
            name: user.user_metadata.user_name,
            userid: user.id,
            camefrom: cameFrom,
            linkedgithub: linkedGithub,
            enabled_notifications,
            goal,
            levels_completed: [],
            levels_skipped: [],
            xp: [{ date: String(new Date()), xp: 0 }],
          });

        if (session.provider_token) {
          const octokit = new Octokit({ auth: session.provider_token });
          try {
            const { data: repo } =
              await octokit.rest.repos.createForAuthenticatedUser({
                name: "type-challenges-solutions",
                private: false,
              });

            console.log("Repository created: ", repo.html_url);
          } catch (error) {
            console.error("Error creating repository: ", error);
          }

          try {
            const { data } =
              await octokit.rest.repos.createOrUpdateFileContents({
                owner: user.user_metadata.user_name,
                repo: "type-challenges-solutions",
                path: "README.md",
                message: "Initial commit",
                committer: {
                  name: user.user_metadata.user_name,
                  email: user.user_metadata.email,
                },
                content:
                  "IyMgVHlwZVNjcmlwdCBDaGFsbGVuZ2VzOiBNeSBTb2x1dGlvbnMKClRoaXMgcmVwb3NpdG9yeSBob2xkcyB0aGUgc29sdXRpb25zIGZvciB0aGUgcG9wdWxhciBUeXBlIENoYWxsZW5nZXMuIAoKSSd2ZSBjb25xdWVyZWQgY2hhbGxlbmdlcyBmcm9tIGJlZ2lubmVyIHRvIGV4cGVydCwgYW5kIHRoZXNlIHNvbHV0aW9ucyBhcmUgaGVyZSB0byBzaG93IGl0IQoKKipXaGF0J3MgaW5zaWRlPyoqCgoqIEZvbGRlcnMgZm9yIGRpZmZlcmVudCBkaWZmaWN1bHR5IGxldmVsczogRWFzeSwgTWVkaXVtLCBIYXJkLCBhbmQgRXh0cmVtZS4KKiBFYWNoIGNoYWxsZW5nZSBoYXMgaXRzIG93biBNYXJrZG93biBmaWxlIHdpdGggdGhlIHNvbHV0aW9uIGNsZWFybHkgZXhwbGFpbmVkLgoKKipXYW50IHRvIHNlZSBteSBzb2x1dGlvbnM/KioKCkJyb3dzZSB0aGUgZm9sZGVycyB0byBzZWUgaG93IEkgdGFja2xlZCB0aGVzZSBjaGFsbGVuZ2VzLiBUaGlzIG1pZ2h0IGdpdmUgeW91IHNvbWUgaWRlYXMgZm9yIHlvdXIgb3duIFR5cGVTY3JpcHQgam91cm5leSEK",
              });

            console.log("Dispatch event created: ", data);
          } catch (error) {
            console.error("Error creating dispatch event: ", error);
          }
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
