const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Função para buscar os filmes em cartaz
export async function getMovies() {
  if (!API_URL || !API_KEY) {
    console.error("API_URL ou API_KEY não definido");
    return [];
  }
  try {
    const response = await fetch(
      `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar filmes: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}

// Função para buscar detalhes de um filme
export async function getMovieDetails(id: number) {
  if (!API_URL || !API_KEY) {
    console.error("API_URL ou API_KEY não definido");
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do filme: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    return null;
  }
}
