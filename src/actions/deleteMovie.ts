"use server";

import { cookies } from "next/headers";

export async function deleteMovie(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("primeflixToken")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar filme");
  }

  return await res.json();
}
