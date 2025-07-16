"use server";

import { cookies } from "next/headers";
import { api } from "@/utils/apiBack/api";

export async function addMovieToDB(formData: FormData) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("primeflixToken")?.value;
  if (!token) throw new Error("Usuário não autenticado");

  const user_id = formData.get("user_id");
  const filmeId = formData.get("filmeId");
  const title = formData.get("title");
  const language = formData.get("language");
  const release_data = formData.get("release_data");
  const genres = JSON.parse(formData.get("genres") as string);

  try {
    await api.post(
      "/movies",
      {
        title,
        filmeId,
        language,
        release_data,
        user_id,
        genres,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.error("Erro ao adicionar filme ao banco de dados:", error);

    if (error.response?.data?.error === "Filme ja cadastrado.") {
      console.log("O filme já está cadastrado.");
    }
  }
}
