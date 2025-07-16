// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/apiBack/api";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = req.nextUrl;

  // Só proteger a rota /my-movies
  const protectedPaths = ["/my-movies"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next(); // público, continua normalmente
  }

  const token = cookieStore.get("primeflixToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error("Token inválido:", error);
    return false;
  }
}
