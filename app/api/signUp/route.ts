import { signUpSchema } from "@/lib/types";
import { NextResponse } from "next/server";

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

    
}