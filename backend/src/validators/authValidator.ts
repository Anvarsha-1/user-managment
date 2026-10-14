import {z} from "zod";

export const loginSchema = z.object({
    email:z
    .string()
    .trim()
    .email("Please provide a valid email")
    .min(254,"email address is too long")
    .transform((email)=>email.toLowerCase()),
    password:z
    .string()
    .min(1,"Password is required")
    .max(128,"Password is too long")
})

export type LoginInput = z.infer<typeof loginSchema>