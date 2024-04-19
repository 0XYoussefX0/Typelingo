import { signUpSchema } from "@/lib/types";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {

    const body: unknown = await request.json();

    const result = signUpSchema.safeParse(body)

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

    const {error} = await supabase.auth.signUp(
        {
        email: result.data.email,
        password: result.data.password
    }
    )

    // do something with the name if it exists

    if(error) {
       return NextResponse.json("Something went wrong, please try again", {status: 500})
    }

    revalidatePath('/', 'layout')
    redirect("/dashboard")


}