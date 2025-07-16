import Image from "next/image";

import { getMovies } from "@/utils/actions/api";
import { MoviesProps } from "@/utils/type";
import MovieOverview from "./movieOveriew";

export default async function Hero() {
  const movieRandom: MoviesProps[] = await getMovies();

  // Função para gerar um numero aleatorio para hero
  function getRandomInt() {
    return Math.floor(Math.random() * 20);
  }

  const random = getRandomInt();
  const movie: MoviesProps = movieRandom[random];

  return (
    <section
      className="w-full flex justify-center relative h-170 mt-15 
      max-sm:h-full"
    >
      <div
        className="w-9/10 max-w-550 h-full relative 
        max-sm:w-full max-sm:h-100 "
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="Imagem de fundo"
          quality={100}
          priority={true}
          fill
          className=" rounded-2xl shadow-2xl shadow-gray-500 absolute opacity-60 
          max-sm:rounded-none max-sm:object-cover max-sm:shadow-none"
        />
        <div className="absolute w-full h-full ">
          <h1
            className="absolute bottom-10 left-10 font-bold text-3xl text-white 
            max-sm:text-2xl max-sm:bottom-4"
          >
            {movie.title}
          </h1>
          <MovieOverview overview={movie.overview} />
        </div>
      </div>
    </section>
  );
}
