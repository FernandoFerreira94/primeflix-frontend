import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import { getMovieDetails } from "@/utils/actions/api";
import { addMovieToDB } from "@/actions/addMoviesToDB";
import { MoviesProps, NewMoviesProps } from "@/utils/type";
import { api } from "@/utils/apiBack/api";

interface PageProps {
  params: { id: string };
}

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  // recuperando os detalhes do filme
  const movieId: MoviesProps = await getMovieDetails(numId);

  const cookieStorage = await cookies();
  const token = cookieStorage.get("primeflixToken")?.value;
  let user_id = "";

  if (token) {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user_id = response.data.id;
  }

  const {
    title,
    original_language,
    release_date,
    genres,
    id: filmeId,
  } = movieId;

  let movieExist: NewMoviesProps | undefined = undefined;

  if (token) {
    const isMovieExistList = await api.get<NewMoviesProps[]>("/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    movieExist = isMovieExistList.data.find(
      (movie) => Number(movie.filmeId) === numId
    );
  }

  console.log(movieExist);
  return (
    <main className="w-full flex justify-center mt-20 min-h-dvh">
      <div className="container flex h-full max-sm:flex-col max-sm:items-center">
        <div className="w-1/2 max-sm:w-full">
          <Image
            height={500}
            width={500}
            src={`https://image.tmdb.org/t/p/original/${movieId.poster_path}`}
            alt="Imagem do filme"
            quality={100}
            priority
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-5 mt-5 max-sm:w-full max-sm:px-2">
          <h1 className="text-white text-2xl font-semibold">
            {movieId.original_title}
          </h1>
          <p className="text-white">
            <strong className="text-xl">Sinopse:</strong> {movieId.overview}
          </p>
          <p className="text-white">
            <strong className="text-xl">Gênero: </strong>{" "}
            {movieId.genres.map((g) => g.name).join(" / ")}
          </p>
          <p className="text-white">
            <strong className="text-xl">Idioma:</strong>{" "}
            {movieId.spoken_languages.map((l) => l.english_name).join(" / ")}
          </p>
          <p className="text-white">
            <strong className="text-xl">Data de lançamento:</strong>{" "}
            {movieId.release_date}
          </p>
          <p className="text-white">
            <strong className="text-xl">Produção:</strong>{" "}
            {movieId.production_companies.map((c) => c.name).join(" / ")}
          </p>
          <p className="text-white">
            <strong className="text-xl">Produzido em:</strong>{" "}
            {movieId.production_countries.map((c) => c.name).join(" / ")}
          </p>
          <p className="text-white">
            <strong className="text-xl">Nota:</strong> {movieId.vote_average} /
            10
          </p>

          {movieId.homepage && (
            <p className="text-white">
              <strong className="text-xl">Site oficial:</strong>{" "}
              <Link
                href={movieId.homepage}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {movieId.homepage}
              </Link>
            </p>
          )}

          <div className="flex gap-5">
            <Link
              href={`https://www.youtube.com/results?search_query=${movieId.original_title}`}
              target="_blank"
              className="text-white text-md font-semibold bg-slate-700 px-2 py-2 rounded-lg hover:bg-slate-900 max-sm:w-3/10 max-sm:text-center"
            >
              Trailer
            </Link>

            <form action={addMovieToDB}>
              <input type="hidden" name="title" value={title} />
              <input type="hidden" name="filmeId" value={id} />
              <input type="hidden" name="language" value={original_language} />
              <input type="hidden" name="release_data" value={release_date} />
              <input type="hidden" name="user_id" value={user_id} />
              <input
                type="hidden"
                name="genres"
                value={JSON.stringify(
                  genres.map((g) => ({
                    id: String(g.id), // o backend espera como string
                    name: g.name,
                  }))
                )}
              />

              {token && !movieExist && (
                <button
                  type="submit"
                  className="text-white text-md font-semibold bg-green-700 px-2 py-2 rounded-lg cursor-pointer hover:bg-green-900 max-sm:w-full"
                >
                  Adicionar filme
                </button>
              )}

              {token && movieExist && (
                <button
                  disabled
                  className="text-white text-md font-semibold bg-gray-600 px-2 py-2 rounded-lg cursor-not-allowed max-sm:w-full"
                >
                  Filme já cadastrado
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
