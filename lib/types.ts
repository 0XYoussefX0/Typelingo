import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})


export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TLoginSchema = z.infer<typeof loginSchema>

export const typesForTesting = `
type Expect<T extends true> = T;
type ExpectTrue<T extends true> = T;
type ExpectFalse<T extends false> = T;
type IsTrue<T extends true> = T;
type IsFalse<T extends false> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
 T,
>() => T extends Y ? 1 : 2
 ? true
 : false;
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<T> = 0 extends 1 & T ? true : false;
type NotAny<T> = true extends IsAny<T> ? false : true;

type Debug<T> = { [K in keyof T]: T[K] };
type MergeInsertions<T> = T extends object
 ? { [K in keyof T]: MergeInsertions<T[K]> }
 : T;

type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
 ? true
 : false;
type ExpectValidArgs<
 FUNC extends (...args: any[]) => any,
 ARGS extends any[],
> = ARGS extends Parameters<FUNC> ? true : false;

type UnionToIntersection<U> = (
 U extends any ? (k: U) => void : never
) extends (k: infer I) => void
 ? I
 : never;

const doNotExecute = (func: () => any) => {};`;