import Hero from "@/components/hero";
import MovieTop from "@/components/movies-top";
import { getMovies } from "@/utils/actions/api";
import { MoviesProps } from "@/utils/type";

export default async function Home() {
  const getFilmes: MoviesProps[] = await getMovies();
  return (
    <main>
      <Hero />
      <MovieTop qtdMin={0} qtdMax={5} text="Em alta" />
      <hr className=" text-transparent mt-10" />
      <MovieTop qtdMin={6} qtdMax={40} text="Filmes" />
    </main>
  );
}
