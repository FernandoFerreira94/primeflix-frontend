import Image from "next/image";
import Link from "next/link";

import { getMovies } from "@/utils/actions/api";
import { MoviesProps } from "@/utils/type";

interface QtdProps {
  qtdMin: number;
  qtdMax: number;
  text: string;
}

export default async function MovieTop({ qtdMin, qtdMax, text }: QtdProps) {
  const movie: MoviesProps[] = await getMovies();

  return (
    <section className="w-full flex-col flex  items-center gap-10 mt-10">
      <div className="container">
        <h1 className="text-white text-3xl font-semibold">{text}</h1>
      </div>
      <div
        className="container grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-20
      max-sm:gap-0 w-full"
      >
        {movie &&
          movie.slice(qtdMin, qtdMax).map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <article className="flex flex-col items-center gap-5 m-3">
                <div
                  className=" w-70 h-90 relative
                max-sm:w-9/10"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt="Imagem de fundo"
                    quality={100}
                    priority={true}
                    fill={true}
                    className="object-cover rounded-lg "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="relative group w-full h-full transition duration-500">
                    <div
                      className="absolute w-full h-full bg-[rgba(0,0,0,0.8)] opacity-0 invisible pointer-events-none 
                       gap-2 flex flex-col justify-center items-center cursor-pointer 
                       transition-opacity duration-500 group-hover:opacity-100 group-hover:visible
                        group-hover:pointer-events-auto"
                    >
                      <p className="text-white text-sm text-center line-clamp-4">
                        {movie.overview}
                      </p>
                      <p className="text-white text-md">
                        <span className="font-semibold">Data lançamento:</span>{" "}
                        {movie.release_date}
                      </p>
                      <p className="text-white text-md">
                        <span className="font-semibold">Language:</span>{" "}
                        {movie.original_language.toLocaleUpperCase()}
                      </p>
                      <p className="text-white text-md">
                        <span className="font-semibold">Vote:</span>{" "}
                        {movie.vote_average} / 10
                      </p>
                    </div>
                  </div>
                </div>
                <h2 className="text-white text-center  text-2xl font-semibold">
                  {movie.title}
                </h2>
              </article>
            </Link>
          ))}
      </div>
    </section>
  );
}
