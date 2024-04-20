import { signUpSchema } from "@/lib/types";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Enums } from "@/lib/database.types";

export async function POST(request: Request) {

    const body: unknown = await request.json();

    if (typeof body === 'object' && body !== null && 'signUpFormData' in body) {
        const result = signUpSchema.safeParse(body.signUpFormData)
        let zodErrors: { [key: string]: string[] | undefined } = {}
        if(!result.success) {
            const errors = result.error.flatten().fieldErrors
            for(const property in errors) {
                const key = property as keyof typeof errors
                zodErrors[key] = errors[key]
            }
            return NextResponse.json({ errors: zodErrors })
        }
    
        const supabase = createClient()
    
        const {error: signUpError, data: user} = await supabase.auth.signUp(
            {
            email: result.data.email,
            password: result.data.password
        }
        )

if('multiStepFormData' in body) {   
    const { cameFrom, linkedGithub, enabled_notifications, goal } = body.multiStepFormData as { cameFrom: string, linkedGithub: boolean, enabled_notifications: boolean, goal: Enums<"goal"> }

    const { error: profilesError } = await supabase
    .from('profiles')
    .insert({ name: result.data.name, userid: user.user?.id, cameFrom, linkedGithub, enabled_notifications, goal, levels_completed: [], levels_skipped: [], xp: [0, 0, 0, 0, 0, 0, 0], time_spent_last_24h: 0})


    // handle profilesError
}
        
    
        if(signUpError) {
           return NextResponse.json("Something went wrong, please try again", {status: 500})
        }


    
        revalidatePath("/", "layout");
        return NextResponse.json({ success: true }, { status: 200 })
      }
      else {
        return NextResponse.json("Invalid request", {status: 400})
      }

}