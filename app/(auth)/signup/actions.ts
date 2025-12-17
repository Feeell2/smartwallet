
'use server'
import { SignupSchema, RegisterValues } from "@/app/schemas/auth";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'
export async function signup(data: RegisterValues) {
    // Walidacja Zodem (safeParse nie rzuca błędem, tylko zwraca status)
    const validatedFields = SignupSchema.safeParse(data);

    // Sprawdzenie czy walidacja przeszła
    if (!validatedFields.success) {
        return { error: "Błędne dane!", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { email, password, name } = validatedFields.data;

    // Rate limiting - 3 rejestracje na email w ciągu godziny
    const rateLimitResult = await rateLimit(`signup:${email}`, {
        requests: 3,
        window: 60 * 60 * 1000, // 1 godzina
    });

    if (!rateLimitResult.success) {
        const resetInMinutes = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
        return {
            error: `Zbyt wiele prób rejestracji. Spróbuj ponownie za ${resetInMinutes} minut.`,
        };
    }
    const supabase = await createClient()
    const dataObj = {
        email,
        password,
        options: {
            data: {
                name,
                terms_accepted_at: new Date().toISOString(),
                terms_version: "1.0",
            }
        }
    }
    const { error } = await supabase.auth.signUp(dataObj)

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}