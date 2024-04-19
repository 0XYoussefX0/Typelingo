import {z} from "zod";

export const signUpSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
})



export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TLoginSchema = z.infer<typeof loginSchema>