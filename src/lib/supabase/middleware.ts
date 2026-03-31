import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Renova o token automaticamente se expirado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redireciona para login se não autenticado e tentando acessar área protegida
  if (!user && request.nextUrl.pathname.startsWith('/leads')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (!user && request.nextUrl.pathname.startsWith('/templates')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (!user && request.nextUrl.pathname.startsWith('/analytics')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redireciona para leads se já autenticado e tentando acessar login/registro
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/registro')) {
    const url = request.nextUrl.clone();
    url.pathname = '/leads';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
