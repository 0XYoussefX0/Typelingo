import { signUpSchema } from "@/lib/types";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

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

    const {error} = await supabase.auth.signInWithPassword(
    {
        email: result.data.email,
        password: result.data.password
    }
    )

    if(error) {
       console.log(error.status)
       return NextResponse.json("Invalid login credentials", {status: 400})
    }

    return NextResponse.json({ success: true }, { status: 200 })
}