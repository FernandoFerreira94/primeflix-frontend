import Link from "next/link";
import { cookies } from "next/headers";

import DeleteMovie from "@/components/DeleteMovie";
import { NewMoviesProps } from "@/utils/type";
import { api } from "@/utils/apiBack/api";

export default async function ListMoviesPages() {

  const cookieStorage = await cookies();
  const token = cookieStorage.get("primeflixToken")?.value;

  // fetch buscando filmes do banco
  const response = await api.get("/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const movies: NewMoviesProps[] = response.data;

  return (
    <main
      className={` w-full container mx-auto flex justify-center ${
        movies.length < 5 ? "h-175" : "min-h-screen"
      } max-lg:h-full`}
    >
      <section className="text-white mt-40 w-full">
        <h1 className="text-4xl  w-full italic font-bold text-center text-white tracking-widest">
          Meus Filmes
        </h1>{" "}
        {movies.length > 0 ? (
          <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mt-20 w-full">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="border p-4 rounded-md flex flex-col gap-1"
              >
                <Link
                  href={`/movie/${movie.filmeId}`}
                  className="text-2xl font-bold text-slate-400
                transistion duration-500 hover:text-slate-500 "
                >
                  <span>{movie.title}</span>
                </Link>
                <span className="text-sm text-slate-200">
                  <strong> Data de lançamento:</strong> {movie.release_data}
                </span>
                <span className="text-sm text-slate-200">
                  <strong>Audio:</strong> {movie.language}
                </span>
                <span className="text-sm text-slate-200">
                  <strong>Gêneros:</strong>{" "}
                  {movie.genres.map((g) => g.genre?.name).join("/ ")}
                </span>
                <DeleteMovie movieId={movie.id} />
              </div>
            ))}
          </article>
        ) : (
          <h1 className="text-2xl text-center text-white mt-20">
            Nenhum filme cadastrado
          </h1>
        )}
      </section>
    </main>
  );
}
