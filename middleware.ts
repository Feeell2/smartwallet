import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // 1. Zdefiniuj listę stron, na które można wejść bez logowania
    const publicPaths = ['/login', '/register', '/signup', '/auth']
    // '/auth' jest ważne dla potwierdzania maila (callbacki)!

    // 2. Sprawdź, czy obecna strona jest na liście publicznych
    const isPublicPage = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

    // 3. Jeśli nie ma usera i NIE JEST na publicznej -> wypad na login
    if (!user && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 4. Jeśli jest user i próbuje wejść na publiczną (np. znowu na login/register) -> wypad na dashboard
    if (user && isPublicPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}