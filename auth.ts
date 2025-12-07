// Plik: auth.ts (w głównym katalogu)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            // Tutaj tymczasowa prosta konfiguracja, żeby błąd zniknął
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                return null
            },
        }),
    ],
    pages: {
        signIn: '/login', // Twoja strona logowania
    },
})