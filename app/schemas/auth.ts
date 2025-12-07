import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z.string().min(6, { message: "Hasło musi mieć min. 6 znaków" }),
})

export const SignupSchema = z.object({
    name: z.string().min(3, { message: "Imię musi mieć min. 3 znaki" }),
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z.string().min(6, { message: "Hasło musi mieć min. 6 znaków" }),
})
