'use server'
import { LoginSchema, LoginValues } from "@/app/schemas/auth";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'


export async function login(data: LoginValues) {

    // Walidacja Zodem (safeParse nie rzuca błędem, tylko zwraca status)
    const validatedFields = LoginSchema.safeParse(data);

    // Sprawdzenie czy walidacja przeszła
    if (!validatedFields.success) {
        return { error: "Błędne dane!", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { email, password } = validatedFields.data;

    // Rate limiting - 5 prób logowania na email w ciągu 15 minut
    const rateLimitResult = await rateLimit(`login:${email}`, {
        requests: 5,
        window: 15 * 60 * 1000, // 15 minut
    });

    if (!rateLimitResult.success) {
        const resetInMinutes = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
        return {
            error: `Zbyt wiele prób logowania. Spróbuj ponownie za ${resetInMinutes} minut.`,
        };
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

