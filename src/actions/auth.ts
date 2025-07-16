"use server";

import { cookies } from "next/headers";

export async function saveAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("primeflixToken", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}