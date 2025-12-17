import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z.string().min(8, { message: "Hasło musi mieć min. 8 znaków" }),
})

export const SignupSchema = z.object({
    name: z.string().min(3, { message: "Imię i nazwisko musi mieć min. 3 znaki" }),
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z.string().min(8, { message: "Hasło musi mieć min. 8 znaków" }),
    agreements: z.boolean().refine((value) => value, {
        message: "Musisz zaakceptować regulamin",
    }),
    confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Hasła nie są zgodne",
            path: ['confirmPassword']
        });
    }
});

export type LoginValues = z.infer<typeof LoginSchema>;
export type RegisterValues = z.infer<typeof SignupSchema>;